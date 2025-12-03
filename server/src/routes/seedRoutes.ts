import { Router } from 'express';
import { seedDatabase } from '../controllers/seedController';

const router = Router();

// Seed endpoint - call this to populate the database
router.post('/seed', seedDatabase);

export default router;
