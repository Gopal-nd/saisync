import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { getProfile, login, logout, register, ResetPassword, validate } from '../controllers/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { staff } from '../controllers/allUsers';
import { createStudyMaterial,deleteStudyMaterial,editStudyMaterial,getStudyMaterials,getStudyMaterialsById } from '../controllers/study-materials';
import { get } from 'http';

const router = express.Router();

router.post('/create',adminMiddleware, createStudyMaterial);

// todo
router.post('/edit',adminMiddleware, editStudyMaterial);
router.delete('/:id',adminMiddleware, deleteStudyMaterial);
router.get("/search",authenticateToken, getStudyMaterials);
router.get("/",authenticateToken, getStudyMaterialsById);




export default router;
