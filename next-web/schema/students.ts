
import { z } from 'zod';

export const studentFormSchema = z.object({
  dob: z.string().min(1),
  phone: z.string().optional(),
  gender: z.string().optional(),
  bloodGroup: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  maritalStatus: z.string().optional(),
  nationality: z.string().optional(),
  aadharNumber: z.string().optional(),
  panNumber: z.string().optional(),
  permanentAddress: z.string().optional(),
  permanentCity: z.string().optional(),
  permanentState: z.string().optional(),
  permanentPincode: z.string().optional(),
  currentAddress: z.string().optional(),
  currentCity: z.string().optional(),
  currentState: z.string().optional(),
  currentPincode: z.string().optional(),
});

export type StudentFormType = z.infer<typeof studentFormSchema>;



export const familySchema = z.object({
    fatherName: z.string().optional(),
    fatherPhone: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherIncome: z.union([z.string(), z.number()]).optional(),
  
    motherName: z.string().optional(),
    motherPhone: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherIncome: z.union([z.string(), z.number()]).optional(),
  
    gardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
  
    seblingName: z.string().optional(),
  })
  
export type FamilyFormType = z.infer<typeof familySchema>


export const academicSchema = z.object({
  tenthBoard: z.string().optional(),
  tenthSchoolName: z.string().optional(),
  tenthMarks: z.coerce.number().optional(),
  tenthMaxMarks: z.coerce.number().optional(),
  tenthPercentage: z.coerce.number().optional(),

  twelfthBoard: z.string().optional(),
  twelfthSchoolName: z.string().optional(),
  twelfthMarks: z.coerce.number().optional(),
  twelfthMaxMarks: z.coerce.number().optional(),
  twelfthPercentage: z.coerce.number().optional(),

  entranceExamName: z.string().optional(),
  entranceExamScore: z.coerce.number().optional(),
  entranceExamMaxScore: z.coerce.number().optional(),
  entranceExamRank: z.coerce.number().optional(),
})

export type AcademicFormType = z.infer<typeof academicSchema>



export const busSchema = z.object({
  route: z.string(),
  busNumber: z.string(),
  pickupPoint: z.string(),
  isUsingBus: z.boolean().default(false),
})

export type BusFormType = z.infer<typeof busSchema>


export const hostelSchema = z.object({
  block: z.string(),
  roomNumber: z.string(),
  wardenName: z.string().optional(),
  isStaying: z.boolean().default(true),
})

export type HostelFormType = z.infer<typeof hostelSchema>


export const workSchema = z.object({
  companyName: z.string().optional(),
  position: z.string().optional(),
  startDate: z.string().optional(), // ISO string
  endDate: z.string().optional(),   // ISO string
  isCurrentlyWorking: z.boolean().default(false),
  experiance: z.string().optional(),
})

export type WorkFormType = z.infer<typeof workSchema>
  