import { 
  DatabaseError,
  DatabaseConnectionError,
  DatabaseAuthenticationError,
  ConnectionLimitError,
  NetworkError,
  QueryError,
  SyntaxError,
  ConstraintViolationError,
  UniqueViolationError,
  ForeignKeyViolationError,
  NotNullViolationError,
  CheckConstraintViolationError,
  TransactionError,
  DeadlockError,
  SerializationError,
  ResourceLimitError,
  QueryTimeoutError
} from './errors';
import { PG_ERROR_CODES } from './errors/pg-error-codes';
import { ValidationError } from './extended_errors/ValidationError';
import { ResourceNotFoundError } from "./extended_errors/ResourceNotFoundError";
import { AuthenticationError } from './extended_errors/AuthenticationError';
import { AuthorizationError } from './extended_errors/AuthorizationError';

// Helper function to determine the appropriate error class based on PostgreSQL error code
export function createDatabaseError(
  _err: any, 
  query?: string, 
  purpose?: string
): Error {
  // Handle non-PostgreSQL errors with specific codes
  if (["ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT", "ECONNRESET"].includes(_err.code)) {
    return new NetworkError(`Failed to connect to the database server: ${_err.message}`, _err.code, _err);
  }

  // Handle purpose-specific errors
  if (purpose) {
    // Handle special cases based on query purpose
    // console.log("Purpose:", purpose, "Error Code:", _err.code);
    if (purpose === "CREATE_USER" && _err.code === '23505') {
      // console.error("Unique constraint violation during user creation:", _err);
      if (_err.constraint === 'users_email_key') {
        return new ValidationError('A user with this email already exists.', 'email');
      } else if (_err.constraint === 'users_username_key') {
        return new ValidationError('This username is already taken.', 'username');
      }
    }
    else if (purpose === "FETCH_PROJECT_DETAILS_BY_ID" && _err.code === "22P02") {
      return new ValidationError('The Resource ID is invalid.', 'project_id');
    }
  }

  // Map PostgreSQL errors based on error code
  if (_err.code && PG_ERROR_CODES[_err.code]) {
    const errorInfo = PG_ERROR_CODES[_err.code];
    
    switch (errorInfo.type) {
      case "connection":
        if (_err.code === "28000" || _err.code === "28P01") {
          return new DatabaseAuthenticationError(
            errorInfo.message || 'Database authentication failed', 
            _err.code, 
            _err
          );
        } else if (_err.code === "53300") {
          return new ConnectionLimitError(
            errorInfo.message || 'Too many database connections', 
            _err.code, 
            _err
          );
        } else {
          return new DatabaseConnectionError(
            errorInfo.message || `Database connection error: ${_err.message}`, 
            _err.code, 
            _err
          );
        }

      case "query":
        if (errorInfo.subtype === "syntax_error") {
          return new SyntaxError(
            `SQL syntax error: ${_err.message}`, 
            _err.code, 
            query, 
            _err
          );
        } else {
          return new QueryError(
            `${errorInfo.message}: ${_err.message}`, 
            _err.code, 
            query, 
            _err
          );
        }

      case "constraint":
        switch (errorInfo.subtype) {
          case "unique_violation":
            return new UniqueViolationError(_err.constraint, _err.code, query, _err);
          case "foreign_key_violation":
            return new ForeignKeyViolationError(_err.constraint, _err.code, query, _err);
          case "not_null_violation":
            return new NotNullViolationError(_err.column, _err.code, query, _err);
          case "check_violation":
            return new CheckConstraintViolationError(_err.constraint, _err.code, query, _err);
          default:
            return new ConstraintViolationError(
              `${errorInfo.message}: ${_err.message}`, 
              _err.code, 
              _err.constraint, 
              query, 
              _err
            );
        }

      case "transaction":
        if (errorInfo.subtype === "deadlock_detected") {
          return new DeadlockError(_err.code, query, _err);
        } else if (errorInfo.subtype === "serialization_failure") {
          return new SerializationError(_err.code, query, _err);
        } else {
          return new TransactionError(
            `${errorInfo.message}: ${_err.message}`, 
            _err.code, 
            query, 
            _err
          );
        }

      case "resource":
        if (errorInfo.subtype === "query_canceled") {
          return new QueryTimeoutError(_err.code, query, _err);
        } else {
          return new ResourceLimitError(
            `${errorInfo.message}: ${_err.message}`, 
            _err.code, 
            query, 
            _err
          );
        }

      default:
        return new DatabaseError(`Database error: ${errorInfo.message}`, _err.code, _err);
    }
  }

  // Handle already thrown custom errors
  
  if (
    _err instanceof ResourceNotFoundError ||
    _err instanceof AuthorizationError ||
    _err instanceof ValidationError ||
    _err instanceof AuthenticationError ||
    _err instanceof DatabaseError
  ) {
    return _err;
  }

  // For any other unknown errors
  return new DatabaseError(`Unexpected database error: ${_err.message}`, _err.code, _err);
}