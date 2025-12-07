import { Router } from 'express';
import { protect } from '../middleware/authMiddleware';
import { sendMessage, getChats, getChatHistory } from '../controllers/peerChatController';

const router = Router();

// All routes are protected
router.use(protect);

router.post('/send', sendMessage);
router.get('/', getChats);
router.get('/:chatId', getChatHistory);

export default router;
