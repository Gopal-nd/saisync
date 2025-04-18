import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { getProfile, login, logout, register, ResetPassword, validate } from '../controllers/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { staff } from '../controllers/allUsers';
import { getAttendence } from '../controllers/attendence';
import { get } from 'http';
import { adminOrStaffMiddleware } from '../middleware/adminOrStaffMiddleware';
import { editAttendence, getThePeriodAttendence, staffPeriodDetails } from '../controllers/staff-attendence';

const router = express.Router();




router.get("/class",adminOrStaffMiddleware, staffPeriodDetails);
router.get("/attendance/absent",authenticateToken, getThePeriodAttendence);
router.put('/attendance',adminOrStaffMiddleware,editAttendence)


export default router;
