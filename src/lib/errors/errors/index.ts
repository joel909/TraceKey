// Export all error types from a single file for easy importing
export { DatabaseError } from './DatabaseError';
export { 
  DatabaseConnectionError, 
  DatabaseAuthenticationError,
  ConnectionLimitError,
  NetworkError
} from './ConnectionError';
export { 
  QueryError, 
  SyntaxError,
  ResourceLimitError,
  QueryTimeoutError
} from './QueryErrors';
export { 
  ConstraintViolationError,
  UniqueViolationError,
  ForeignKeyViolationError,
  NotNullViolationError,
  CheckConstraintViolationError
} from './ConstraintError';
export { 
  TransactionError,
  DeadlockError,
  SerializationError
} from './TransactionErrors';