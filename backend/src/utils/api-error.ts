export class APIError extends Error {
    status: number
    success: boolean;
    errors: any;
    constructor({status,message='Internal Server Error',stack='',errors=[]}: {message: string, status: number,stack:string,errors:[]}) {
        super(message)
        this.status = status
        this.message = message;
        this.success = false;
        this.errors = errors;
        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}