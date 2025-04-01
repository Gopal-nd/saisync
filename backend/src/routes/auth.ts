import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { getProfile, login, logout, register, ResetPassword, validate } from '../controllers/auth';

const router = express.Router();

router.post('/sign-up', register);
router.post('/sign-in', login);
router.post('/reset', ResetPassword);
router.post('/logout', logout);
// router.post('/sned-otp',sendOTP)

router.get('/validate',validate)

// router.get('/verify-token', authenticateToken, verifyToken);
// router.get('/logout', authenticateToken, logout);
router.get('/me',authenticateToken,getProfile)


export default router;
