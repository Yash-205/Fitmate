import express from 'express';
import { getGyms, getGymById, getMyMembers, getMyTrainers, getMemberDetails, getTrainerDetails } from '../controllers/gymController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getGyms);
router.get('/members', protect, getMyMembers);
router.get('/members/:id', protect, getMemberDetails);
router.get('/trainers', protect, getMyTrainers);
router.get('/trainers/:id', protect, getTrainerDetails);
router.get('/:id', getGymById);

export default router;
