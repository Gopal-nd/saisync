import express from 'express';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { getAdminDashboardData } from '../controllers/dashboard';

const router = express.Router();

router.get('/admin', adminMiddleware, getAdminDashboardData);

export default router;
