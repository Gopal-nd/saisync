
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

export const BranchType = z.enum(["AIML", "ECE", "CSE", "EEE", "ISE", "MECH"]);
export const SemesterType = z.enum(["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"]);

export const SubjectSchema = z.object({
  branchName: BranchType,
  semesterNumber: SemesterType,
  subjectName: z.string().min(1, "Required"),
  subjectCode: z.string().min(1, "Required"),
  noOfCredits: z.coerce.number().min(0, "At least 0 credit").max(20,"Cannot be More Than 20 credits"),
  staffName: z.string().min(1, "Required"),
  isLab: z.boolean().default(false),
});