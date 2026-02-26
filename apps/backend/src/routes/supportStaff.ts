import express from 'express';

import {  authenticateToken } from '../middleware/auth';
import { adminMiddleware } from '../middleware/adminMiddleware';
import {  editSupportStaff,deleteSupportStaff,getAllSupportStaff,getSuportStaffById, editAcadamicDetails, editBusDetails, editDocumentsDetails, editFamilyDetails,
    editHostelDetails, editPersonalDetails, editWorkDetails, getAcadamicDetails, getBusDetails, getDocumentsDetails, getFamilyDetails, getHostelDetails, getPersonalDetails, getWorkDetails
} from '../controllers/supportStaff';

const router = express.Router();

router.put('/edit',adminMiddleware,editSupportStaff);
router.delete('/:id',adminMiddleware, deleteSupportStaff);
router.get("/search",authenticateToken, getAllSupportStaff);
router.get("/",authenticateToken, getSuportStaffById)

router.get("/personal",adminMiddleware, getPersonalDetails);
router.put("/personal",adminMiddleware, editPersonalDetails);

router.get("/family",adminMiddleware, getFamilyDetails);
router.put("/family",adminMiddleware, editFamilyDetails);

router.get("/acadamic",adminMiddleware, getAcadamicDetails);
router.put("/acadamic",adminMiddleware, editAcadamicDetails);

router.get("/documents",adminMiddleware, getDocumentsDetails);
router.put("/documents",adminMiddleware, editDocumentsDetails);

router.get("/bus",adminMiddleware, getBusDetails);
router.put("/bus",adminMiddleware, editBusDetails);

router.get("/hostel",adminMiddleware, getHostelDetails);
router.put("/hostel",adminMiddleware, editHostelDetails);

router.get("/work",adminMiddleware, getWorkDetails);
router.put("/work",adminMiddleware, editWorkDetails);






export default router;
