import { z } from 'zod'


export const certificateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  duration: z.number().int().min(1, "Duration must be a positive integer"),
  issuedBy: z.string().min(1, "Issued By is required"),
  issueDate: z.coerce.date().default(new Date()),
  expiryDate: z.coerce.date().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  proofUrl: z.string().optional()
});


export type certificateFormType = z.infer<typeof certificateSchema>

