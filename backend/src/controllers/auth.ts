
import bcrypt from 'bcryptjs';
import { type Request ,type Response } from 'express';
import { generateToken } from '../lib/jwt';
import { prisma } from '../lib/db';


export const register = async (req: Request, res: Response) => {
  const { email, password, name, usn, role } = req.body;
  console.log(email,password,"from the backend")
if(!email || !password){
    console.log('user details is required')
return res.status(400).json({ message: 'email and password is required' });
}
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    
      console.log('user alredy exist')
    return res.status(400).json({ message: 'User already exists' })
}

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name, usn, role },
  });
  console.log('user created',user)

  res.json({ message: 'User registered successfully', user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
console.log(email,password)
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    console.log(user.id,user.role)
  const token = generateToken(user.id, user.role);
  res.json({ token ,user});
};

export const getProfile = async (req: Request, res: Response) => {
  const { userId } = req.body.user;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({ user });
};
