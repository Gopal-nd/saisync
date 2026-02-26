import { type Request, type Response, type NextFunction } from 'express';
import { verifyToken } from '../lib/jwt';
import { ApiResponse } from '../utils/api-response';
import type { JwtPayload } from 'jsonwebtoken';






export const adminOrStaffMiddleware = (req: any, res: Response, next: NextFunction): void => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    console.log('No token provided');
    res.status(401).json(new ApiResponse({data:null,statusCode:500,message:"Access Denied"}))

    return;
  }

  try {
    const decoded = verifyToken(token) as JwtPayload 

    if (!decoded || typeof decoded !== "object" || !decoded.role) {
        res.status(403).json(new ApiResponse({ data: null, statusCode: 403, message: "Unauthorized: Invalid token or role missing" }));
      }
  
      if (decoded.role !== "ADMIN" && decoded.role !="STAFF" && decoded.role !='HOD') {
        res.status(403).json(new ApiResponse({ data: null, statusCode: 403, message: "Forbidden: Admin or Staff access required" }));
      }

    req.user = decoded;
    next(); 
  } catch (error) {
    res.status(403).json(new ApiResponse({data:null,statusCode:500,message:"something went wrong in Admin Middleware"}))
  }
};


