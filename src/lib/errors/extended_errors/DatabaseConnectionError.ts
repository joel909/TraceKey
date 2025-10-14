export class DatabaseConnectionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DatabaseConnectionError";
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}