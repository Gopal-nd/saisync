import  type { Request, Response, NextFunction } from 'express';
import { APIError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';


const errorHandler = (err: Error | APIError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof APIError) {
    return res.status(err.status).json(new ApiResponse({ 
      statusCode: err.status, 
      data: null, 
      message: err.message 
    }));
  }
  
  console.error("This is the error",err.stack);
  return res.status(500).json(new ApiResponse({ 
    statusCode: 500, 
    data: null, 
    message: 'Something went wrong!' 
  }));
};

export default errorHandler;
