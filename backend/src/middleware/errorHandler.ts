


import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { APIError } from "../utils/api-error";
import { ApiResponse } from "../utils/api-response";

const errorHandler = (err: Error | APIError, req: Request, res: Response, next: NextFunction) => {
  
  // Handle APIError (custom application errors)
  if (err instanceof APIError) {
    return res.status(err.status).json(new ApiResponse({ 
      statusCode: err.status, 
      data: null, 
      message: err.message,
    }));
  }

  // ✅ Handle Zod Validation Errors
  if (err instanceof ZodError) {
    return res.status(400).json(new ApiResponse({ 
      statusCode: 400, 
      data: null, 
      message: "Validation Error", 
    }));
  }

  // ✅ Handle Prisma Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    let message = "Database error occurred";
    
    // Handle specific Prisma error codes
    if (err.code === "P2002") message = "Subject with this code already exists";
    
    return res.status(400).json(new ApiResponse({ 
      statusCode: 400, 
      data: null, 
      message,
    }));
  }

  // ✅ Log and Handle Unexpected Errors
  console.error("Unhandled Error:", err.stack);
  return res.status(500).json(new ApiResponse({ 
    statusCode: 500, 
    data: null, 
    message: "Something went wrong!", 
  }));
};

export default errorHandler;

