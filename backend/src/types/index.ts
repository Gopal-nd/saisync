import type{ Role } from '@prisma/client'
import * as z from 'zod'
import { AvilableUserRoles } from '../utils/constants'

export const RegisterForm = z.object({
    email:z.string().email(),
    role:z.enum(['ADMIN','STAFF','STUDENT'])
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