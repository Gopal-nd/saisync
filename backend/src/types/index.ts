import type{ Role } from '@prisma/client'
import * as z from 'zod'
import { AvilableUserRoles } from '../utils/constants'

export const RegisterForm = z.object({
    email:z.string().email(),
    role:z.enum(AvilableUserRoles)
})