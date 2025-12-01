import { Request, Response } from 'express';
import { getChatResponse } from '../services/openaiService';
import { IUser } from '../models/User';
import Conversation from '../models/Conversation';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { message, conversationId } = req.body;
        const user = req.user as IUser;

        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }

        let conversation;

        if (conversationId) {
            conversation = await Conversation.findOne({ _id: conversationId, user: user._id });
        }

        if (!conversation) {
            // Create new conversation
            // Generate a simple title from the first message
            const title = message.length > 30 ? message.substring(0, 30) + '...' : message;

            conversation = new Conversation({
                user: user._id,
                title,
                messages: []
            });
        }

        // Add user message
        conversation.messages.push({
            role: 'user',
            content: message,
            timestamp: new Date()
        });

        // Prepare history for context (exclude the message we just added as it's passed as userMessage, 
        // OR include it in history and pass empty userMessage? 
        // Better: Pass history EXCLUDING the current message, and let service append current message.
        // The service logic I wrote appends userMessage. 
        // So I should pass history of PREVIOUS messages.
        const history = conversation.messages.slice(0, -1).map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        const response = await getChatResponse(message, history);

        // Add AI response
        conversation.messages.push({
            role: 'assistant',
            content: response,
            timestamp: new Date()
        });

        await conversation.save();

        res.json({
            response,
            conversationId: conversation._id,
            title: conversation.title
        });
    } catch (error) {
        console.error('Chat controller error:', error);
        res.status(500).json({ error: 'Failed to process chat message' });
    }
};

export const getConversations = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser;
        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const conversations = await Conversation.find({ user: user._id })
            .select('title updatedAt createdAt')
            .sort({ updatedAt: -1 });

        res.json(conversations);
    } catch (error) {
        console.error('Get conversations error:', error);
        res.status(500).json({ error: 'Failed to retrieve conversations' });
    }
};

export const getConversation = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser;
        const { id } = req.params;

        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const conversation = await Conversation.findOne({ _id: id, user: user._id });

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.json(conversation);
    } catch (error) {
        console.error('Get conversation error:', error);
        res.status(500).json({ error: 'Failed to retrieve conversation' });
    }
};

export const deleteConversation = async (req: Request, res: Response) => {
    try {
        const user = req.user as IUser;
        const { id } = req.params;

        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        await Conversation.findOneAndDelete({ _id: id, user: user._id });

        res.json({ message: 'Conversation deleted' });
    } catch (error) {
        console.error('Delete conversation error:', error);
        res.status(500).json({ error: 'Failed to delete conversation' });
    }
};
