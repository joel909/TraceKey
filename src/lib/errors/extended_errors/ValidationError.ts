// errors/ValidationError.ts
export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';

    // This removes the constructor from stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

