import { QueryError } from './QueryErrors';

export class ConstraintViolationError extends QueryError {
  constructor(
    message: string,
    code?: string,
    public constraint?: string,
    query?: string,
    originalError?: any
  ) {
    super(message, code, query, originalError);
    this.name = 'ConstraintViolationError';
  }
}

export class UniqueViolationError extends ConstraintViolationError {
  constructor(constraint?: string, code?: string, query?: string, originalError?: any) {
    super('Unique constraint violated', code, constraint, query, originalError);
    this.name = 'UniqueViolationError';
  }
}

export class ForeignKeyViolationError extends ConstraintViolationError {
  constructor(constraint?: string, code?: string, query?: string, originalError?: any) {
    super('Foreign key constraint violated', code, constraint, query, originalError);
    this.name = 'ForeignKeyViolationError';
  }
}

export class NotNullViolationError extends ConstraintViolationError {
  constructor(column?: string, code?: string, query?: string, originalError?: any) {
    super(`Not null constraint violated: ${column || 'unknown column'}`, code, column, query, originalError);
    this.name = 'NotNullViolationError';
  }
}

export class CheckConstraintViolationError extends ConstraintViolationError {
  constructor(constraint?: string, code?: string, query?: string, originalError?: any) {
    super(`Check constraint violated: ${constraint || 'unknown constraint'}`, code, constraint, query, originalError);
    this.name = 'CheckConstraintViolationError';
  }
}