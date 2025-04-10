import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import {  deleteUsers,  getAllStudents, getUserById, editStudent, editAcadamicDetails, editBusDetails, editDocumentsDetails, editFamilyDetails,
    editHostelDetails, editPersonalDetails, editWorkDetails, getAcadamicDetails, getBusDetails, getDocumentsDetails, getFamilyDetails, getHostelDetails, getPersonalDetails, getWorkDetails,
    getLabStudents,
    assignLabBatches
} from '../controllers/students';
import { staffMiddleware } from '../middleware/staffMiddleware';
import { adminOrStaffMiddleware } from '../middleware/adminOrStaffMiddleware';


const router = express.Router();

router.put('/edit',adminOrStaffMiddleware,editStudent);
router.delete('/:id',adminMiddleware, deleteUsers);
router.get("/search",authenticateToken, getAllStudents);
router.get("/",authenticateToken, getUserById);

router.get("/lab",authenticateToken, getLabStudents);
router.post("/lab/assign",authenticateToken, assignLabBatches);

router.get("/personal",adminOrStaffMiddleware, getPersonalDetails);
router.put("/personal",adminOrStaffMiddleware, editPersonalDetails);

router.get("/family",adminOrStaffMiddleware, getFamilyDetails);
router.put("/family",adminOrStaffMiddleware, editFamilyDetails);

router.get("/acadamic",adminOrStaffMiddleware, getAcadamicDetails);
router.put("/acadamic",adminOrStaffMiddleware, editAcadamicDetails);

router.get("/documents",adminOrStaffMiddleware, getDocumentsDetails);
router.put("/documents",adminOrStaffMiddleware, editDocumentsDetails);

router.get("/bus",adminOrStaffMiddleware, getBusDetails);
router.put("/bus",adminOrStaffMiddleware, editBusDetails);

router.get("/hostel",adminOrStaffMiddleware, getHostelDetails);
router.put("/hostel",adminOrStaffMiddleware, editHostelDetails);

router.get("/work",adminOrStaffMiddleware, getWorkDetails);
router.put("/work",adminOrStaffMiddleware, editWorkDetails);




export default router;
