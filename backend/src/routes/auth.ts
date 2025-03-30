import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { getProfile, login, logout, register, verifyToken } from '../controllers/auth';

const router = express.Router();

router.post('/sign-up', register);
router.post('/sign-in', login);

// router.get('/verify-token', authenticateToken, verifyToken);
// router.post('/logout', authenticateToken, logout);
// router.get('/me',authenticateToken,getProfile)


export default router;
