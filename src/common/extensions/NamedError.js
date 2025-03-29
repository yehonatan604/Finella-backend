export class NamedError extends Error {
    constructor(message, name) {
        super(message);
        this.name = name;
    }
}