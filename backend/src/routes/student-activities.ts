
import  express from 'express';
import { createCertificate, deleteCertificates, getCertificate, getCertificateById, updateCertificates } from '../controllers/students-activities/certificates';
import { authenticateToken } from '../middleware/auth';
import { createProject, deleteProject, getAllProjects, getProjectById, updateProject } from '../controllers/students-activities/project.controller';
import { getAllTrips,createExperianceTrip,deleteTrip,getTripById,updateTrip } from '../controllers/students-activities/exp-tip.controller';
import { getAllInternships,createInternship,deleteInternship,getInternshipById,updateInternship } from '../controllers/students-activities/internship.controller';
import { getAllNptelCorses,createNptel,deleteNptel,getNptelId,updateNptel } from '../controllers/students-activities/nptel.controller';
import { getAllParticipations,createParticipation,getPaticaipationById,updateParticipation,deleteParticipation } from '../controllers/students-activities/participate.controller';
import { getAllAchivements,createAchivement,getAchivementById,updateAchivements,deleteAchivements } from '../controllers/students-activities/achivements.controller';
import { getAllMedical ,createMedical,deleteMedical,getMedicalById,updateMedical} from '../controllers/students-activities/medical.controller';
import { getAllScholerships,createScolership,getScholershipById,updateScholership,deleteScholership } from '../controllers/students-activities/scholership.controller';
import { createSchedule } from '../controllers/schedule';


const router = express.Router();

router.get("/certificate",authenticateToken, getCertificate);
router.get("/certificate/:id",authenticateToken, getCertificateById);
router.delete("/certificate/:id",authenticateToken, deleteCertificates);
router.post("/certificate/new",authenticateToken, createCertificate);
router.put("/certificate/edit",authenticateToken, updateCertificates);



router.get("/project", authenticateToken, getAllProjects);
router.get("/project/:id", authenticateToken, getProjectById);
router.post("/project/new", authenticateToken, createProject);
router.put("/project/edit/:id", authenticateToken, updateProject);
router.delete("/project/:id", authenticateToken, deleteProject);

router.get("/exp-trip", authenticateToken, getAllTrips);
router.get("/exp-trip/:id", authenticateToken, getTripById);
router.post("/exp-trip/new", authenticateToken, createExperianceTrip);
router.put("/exp-trip/edit/:id", authenticateToken, updateTrip);
router.delete("/exp-trip/:id", authenticateToken, deleteTrip);

router.get("/internship", authenticateToken, getAllInternships);
router.get("/internship/:id", authenticateToken, getInternshipById);
router.post("/internship/new", authenticateToken, createInternship);
router.put("/internship/edit/:id", authenticateToken, updateInternship);
router.delete("/internship/:id", authenticateToken, deleteInternship);

router.get("/nptel", authenticateToken, getAllNptelCorses);
router.get("/nptel/:id", authenticateToken, getNptelId);
router.post("/nptel/new", authenticateToken, createNptel);
router.put("/nptel/edit/:id", authenticateToken, updateNptel);
router.delete("/nptel/:id", authenticateToken, deleteNptel);

router.get("/participate", authenticateToken, getAllParticipations);
router.get("/participate/:id", authenticateToken, getPaticaipationById);
router.post("/participate/new", authenticateToken, createParticipation);
router.put("/participate/edit/:id", authenticateToken, updateParticipation);
router.delete("/participate/:id", authenticateToken, deleteParticipation);

router.get("/medical", authenticateToken, getAllMedical);
router.get("/medical/:id", authenticateToken, getMedicalById);
router.post("/medical/new", authenticateToken, createMedical);
router.put("/medical/edit/:id", authenticateToken, updateMedical);
router.delete("/medical/:id", authenticateToken, deleteMedical);

router.get("/scholoership", authenticateToken, getAllScholerships);
router.get("/scholoership/:id", authenticateToken, getScholershipById);
router.post("/scholoership/new", authenticateToken, createSchedule);
router.put("/scholoership/edit/:id", authenticateToken, updateScholership);
router.delete("/scholoership/:id", authenticateToken, deleteScholership);
// scholoership


export default router;
