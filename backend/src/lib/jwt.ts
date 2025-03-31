import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY!

export const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret);
};
