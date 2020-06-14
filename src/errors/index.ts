export const ERROR_CODES = {
    SUCCESS: 10000,
    ERR_SERVER: 10500,
};

export class BaseError {
    public code: string;
    public msg: string;

    constructor(code, msg) {
        this.code = code;
        this.msg = msg;
    }
}

export class GeneralError extends BaseError {
    constructor(msg = 'server internal error') {
        super(ERROR_CODES.ERR_SERVER, msg);
    }
}
