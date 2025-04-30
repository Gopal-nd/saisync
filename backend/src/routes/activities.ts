
import  express from 'express';
import { createCertificate, getCertificate, updateCertificates } from '../controllers/students-activites';

const router = express.Router();

router.get("/certificate", getCertificate);
router.get("/certificate/new", createCertificate);
router.put("/certificate/edit", updateCertificates);

export default router;
