import { Request, Response } from 'express';
import { getChatResponse } from '../services/openaiService';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }

        const response = await getChatResponse(message);

        res.json({ response });
    } catch (error) {
        console.error('Chat controller error:', error);
        res.status(500).json({ error: 'Failed to process chat message' });
    }
};
