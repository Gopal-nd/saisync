export class APIError extends Error {
    status: number;
    success: boolean;
    errors: any;
  
    constructor({
      status,
      message = 'Internal Server Error',
      stack = '',
      errors = []
    }: {
      status: number;
      message?: string;
      stack?: string;
      errors?: any;
    }) {
      super(message);
      this.status = status;
      this.success = false;
      this.errors = errors;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  