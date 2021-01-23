export class ApiError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
        this.name = this.constructor.name;
        this.message = message;
    }
}
