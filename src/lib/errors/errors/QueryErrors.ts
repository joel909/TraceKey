import { DatabaseError } from './DatabaseError';

export class QueryError extends DatabaseError {
  constructor(
    message: string,
    code?: string,
    public query?: string,
    originalError?: any
  ) {
    super(message, code, originalError);
    this.name = 'QueryError';
  }
}

export class SyntaxError extends QueryError {
  constructor(message: string, code?: string, query?: string, originalError?: any) {
    super(message, code, query, originalError);
    this.name = 'SyntaxError';
  }
}

export class ResourceLimitError extends QueryError {
  constructor(message: string, code?: string, query?: string, originalError?: any) {
    super(message, code, query, originalError);
    this.name = 'ResourceLimitError';
  }
}

export class QueryTimeoutError extends QueryError {
  constructor(code?: string, query?: string, originalError?: any) {
    super('Query execution timed out', code, query, originalError);
    this.name = 'QueryTimeoutError';
  }
}