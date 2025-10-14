import { DatabaseError } from './DatabaseError';

export class DatabaseConnectionError extends DatabaseError {
  constructor(message: string, code?: string, originalError?: any) {
    super(message, code, originalError);
    this.name = 'DatabaseConnectionError';
  }
}

export class DatabaseAuthenticationError extends DatabaseConnectionError {
  constructor(message: string = 'Authentication failed', code?: string, originalError?: any) {
    super(message, code, originalError);
    this.name = 'DatabaseAuthenticationError';
  }
}

export class ConnectionLimitError extends DatabaseConnectionError {
  constructor(message: string = 'Too many connections', code?: string, originalError?: any) {
    super(message, code, originalError);
    this.name = 'ConnectionLimitError';
  }
}

export class NetworkError extends DatabaseConnectionError {
  constructor(message: string = 'Network error occurred', code?: string, originalError?: any) {
    super(message, code, originalError);
    this.name = 'NetworkError';
  }
}