import { Router } from 'express';
import { sendMessage, getConversations, getConversation, deleteConversation } from '../controllers/chatController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/message', protect, sendMessage);
router.get('/conversations', protect, getConversations);
router.get('/:id', protect, getConversation);
router.delete('/:id', protect, deleteConversation);

export default router;
