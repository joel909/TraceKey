import { QueryError } from './QueryErrors';

export class TransactionError extends QueryError {
  constructor(message: string, code?: string, query?: string, originalError?: any) {
    super(message, code, query, originalError);
    this.name = 'TransactionError';
  }
}

export class DeadlockError extends TransactionError {
  constructor(code?: string, query?: string, originalError?: any) {
    super('Deadlock detected', code, query, originalError);
    this.name = 'DeadlockError';
  }
}

export class SerializationError extends TransactionError {
  constructor(code?: string, query?: string, originalError?: any) {
    super('Serialization failure in transaction', code, query, originalError);
    this.name = 'SerializationError';
  }
}