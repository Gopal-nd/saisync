import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
        email?: string;
      };
    }
  }
}

declare module 'express' {
    interface Request {
      user?: { 
        userId: string;
        role: string;
        email?: string;
       };
    }
  }