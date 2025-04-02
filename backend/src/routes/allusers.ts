import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { getProfile, login, logout, register, ResetPassword, validate } from '../controllers/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { staff } from '../controllers/allUsers';

const router = express.Router();

router.get('/staff',adminMiddleware, staff);


export default router;
