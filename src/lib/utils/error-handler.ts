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
} from '../errors/errors';
import { PG_ERROR_CODES } from '../errors/errors/pg-error-codes';
import { ValidationError } from '../errors/extended_errors/ValidationError';
import { ResourceNotFoundError } from "../errors/extended_errors/ResourceNotFoundError";

// Helper function to determine the appropriate error class based on PostgreSQL error code
export function createDatabaseError(
  err: any, 
  query?: string, 
  purpose?: string
): Error {
  // Handle non-PostgreSQL errors with specific codes
  if (["ECONNREFUSED", "ENOTFOUND", "ETIMEDOUT", "ECONNRESET"].includes(err.code)) {
    return new NetworkError(`Failed to connect to the database server: ${err.message}`, err.code, err);
  }

  // Handle purpose-specific errors
  if (purpose) {
    // Handle special cases based on query purpose
    console.log("Purpose:", purpose, "Error Code:", err.code);
    if (purpose === "CREATE_USER" && err.code === '23505') {
      // console.error("Unique constraint violation during user creation:", err);
      if (err.constraint === 'users_email_key') {
        return new ValidationError('A user with this email already exists.', 'email');
      } else if (err.constraint === 'users_username_key') {
        return new ValidationError('This username is already taken.', 'username');
      }
    }
    else if (purpose === "FETCH_PROJECT_DETAILS_BY_ID" && err.code === "22P02") {
      return new ValidationError('The Resource ID is invalid.', 'project_id');
    }
  }

  // Map PostgreSQL errors based on error code
  if (err.code && PG_ERROR_CODES[err.code]) {
    const errorInfo = PG_ERROR_CODES[err.code];
    
    switch (errorInfo.type) {
      case "connection":
        if (err.code === "28000" || err.code === "28P01") {
          return new DatabaseAuthenticationError(
            errorInfo.message || 'Database authentication failed', 
            err.code, 
            err
          );
        } else if (err.code === "53300") {
          return new ConnectionLimitError(
            errorInfo.message || 'Too many database connections', 
            err.code, 
            err
          );
        } else {
          return new DatabaseConnectionError(
            errorInfo.message || `Database connection error: ${err.message}`, 
            err.code, 
            err
          );
        }

      case "query":
        if (errorInfo.subtype === "syntax_error") {
          return new SyntaxError(
            `SQL syntax error: ${err.message}`, 
            err.code, 
            query, 
            err
          );
        } else {
          return new QueryError(
            `${errorInfo.message}: ${err.message}`, 
            err.code, 
            query, 
            err
          );
        }

      case "constraint":
        switch (errorInfo.subtype) {
          case "unique_violation":
            return new UniqueViolationError(err.constraint, err.code, query, err);
          case "foreign_key_violation":
            return new ForeignKeyViolationError(err.constraint, err.code, query, err);
          case "not_null_violation":
            return new NotNullViolationError(err.column, err.code, query, err);
          case "check_violation":
            return new CheckConstraintViolationError(err.constraint, err.code, query, err);
          default:
            return new ConstraintViolationError(
              `${errorInfo.message}: ${err.message}`, 
              err.code, 
              err.constraint, 
              query, 
              err
            );
        }

      case "transaction":
        if (errorInfo.subtype === "deadlock_detected") {
          return new DeadlockError(err.code, query, err);
        } else if (errorInfo.subtype === "serialization_failure") {
          return new SerializationError(err.code, query, err);
        } else {
          return new TransactionError(
            `${errorInfo.message}: ${err.message}`, 
            err.code, 
            query, 
            err
          );
        }

      case "resource":
        if (errorInfo.subtype === "query_canceled") {
          return new QueryTimeoutError(err.code, query, err);
        } else {
          return new ResourceLimitError(
            `${errorInfo.message}: ${err.message}`, 
            err.code, 
            query, 
            err
          );
        }

      default:
        return new DatabaseError(`Database error: ${errorInfo.message}`, err.code, err);
    }
  }

  // Handle already thrown custom errors
  
  if (
    err instanceof ResourceNotFoundError ||
    err instanceof ValidationError ||
    err instanceof DatabaseError
  ) {
    return err;
  }

  // For any other unknown errors
  return new DatabaseError(`Unexpected database error: ${err.message}`, err.code, err);
}