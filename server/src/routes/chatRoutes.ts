import { Router } from 'express';
import { sendMessage } from '../controllers/chatController';

const router = Router();

router.post('/message', sendMessage);

export default router;
