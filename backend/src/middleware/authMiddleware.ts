import { type Request, type Response, type NextFunction } from 'express';
import { verifyToken } from '../lib/jwt';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.body.user = decoded;
    next(); // Ensure next() is called for successful verification
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};
