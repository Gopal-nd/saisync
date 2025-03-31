
import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export type LoginFormTypes = z.infer<typeof loginSchema>;



export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
  usn: z.string().optional(),
  role: z.string().optional(),
  branch: z.string().optional(),
  semester: z.string().optional(),
  section: z.string().optional(),
  schema: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});


export const ResetPasswordSchema = z.object({
  email: z.string().email(),
});

export  const PasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  email: z.string().email(),
  otp: z.string(),
})