import express from 'express';
import { getGyms, getGymById } from '../controllers/gymController';

const router = express.Router();

router.get('/', getGyms);
router.get('/:id', getGymById);

export default router;
