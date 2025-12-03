import express from 'express';
import { getTrainers, getTrainerById } from '../controllers/trainerController';

const router = express.Router();

router.get('/', getTrainers);
router.get('/:id', getTrainerById);

export default router;
