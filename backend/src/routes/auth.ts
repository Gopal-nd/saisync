import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { bulkRegister, getProfile, login, logout, register, ResetPassword, validate } from '../controllers/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { upload } from '../middleware/upload';

const router = express.Router();
router.post('/sign-up',adminMiddleware, register);
router.post('/bulk-sign-up',upload.single('file'),adminMiddleware,bulkRegister);
router.post('/sign-in', login);
router.post('/reset', ResetPassword);
router.post('/logout', logout);
// router.post('/sned-otp',sendOTP)

router.get('/validate',validate)

// router.get('/verify-token', authenticateToken, verifyToken);
// router.get('/logout', authenticateToken, logout);
router.get('/me',authenticateToken,getProfile)


export default router;
