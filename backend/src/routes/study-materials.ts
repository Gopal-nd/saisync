import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { getProfile, login, logout, register, ResetPassword, validate } from '../controllers/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import { staff } from '../controllers/allUsers';
import { createStudyMaterial,deleteStudyMaterial,deleteSubjectStudyMaterial,editStudyMaterial,getStudyMaterials,getStudyMaterialsById, getSubjectStudyMaterialbyId, updateStudyMaterial } from '../controllers/study-materials';
import { get } from 'http';
import { adminOrStaffMiddleware } from '../middleware/adminOrStaffMiddleware';

const router = express.Router();

router.post('/create',adminOrStaffMiddleware, createStudyMaterial);
router.put('/update',adminOrStaffMiddleware, updateStudyMaterial);


// todo
router.post('/edit',adminMiddleware, editStudyMaterial);
router.delete('/:id',adminMiddleware, deleteStudyMaterial);
router.get("/search",authenticateToken, getStudyMaterials);
router.get("/",authenticateToken, getStudyMaterialsById);
router.delete('/material/:id',adminOrStaffMiddleware, deleteSubjectStudyMaterial);
router.get('/material',adminOrStaffMiddleware, getSubjectStudyMaterialbyId);


export default router;
