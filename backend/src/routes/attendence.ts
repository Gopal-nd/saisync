import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { getProfile, login, logout, register, ResetPassword, validate } from '../controllers/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { staff } from '../controllers/allUsers';
import { getAttendence } from '../controllers/attendence';
import { get } from 'http';

const router = express.Router();




router.get("/",authenticateToken, getAttendence);




export default router;
