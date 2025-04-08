import { z } from 'zod'

export const subjectSchema = z.object({
  subjectName: z.string().min(1, "Subject name is required"),
  subjectCode: z.string().min(1, "Subject code is required"),
  year: z.string().default("2022"),
  noOfCredits: z.number().min(1, "At least 1 credit is required"),
  examType: z.enum(["INTERNAL", "EXTERNAL"]),
  writtenType: z.enum(["MCQ", "WRITTEN"]),
  syllabus: z.string().optional(),
  noOfHours: z.number().optional(),
  isLab: z.boolean().optional(),
})

export type SubjectFormType = z.infer<typeof subjectSchema>


export const studyMaterialSchema = z.object({
  // subjectId: z.string().min(1, "Subject is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  url: z.string().url("Invalid URL"),
})

export type StudyMaterialFormType = z.infer<typeof studyMaterialSchema>

