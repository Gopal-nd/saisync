import express from 'express';

import { authenticate } from '../middleware/authMiddleware';
import { getProfile, login, register } from '../controllers/auth';

const router = express.Router();

router.post('/sign-up', register);
router.post('/sign-in', login);
router.get('/profile', authenticate, getProfile);

export default router;
