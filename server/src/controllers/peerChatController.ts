import { Request, Response } from 'express';
import Chat from '../models/Chat';
import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

// Helper to validate relationship
const validateRelationship = async (senderId: string, receiverId: string): Promise<boolean> => {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) return false;

    // 1. Learner <-> Trainer
    if (sender.role === 'learner' && receiver.role === 'trainer') {
        return sender.trainerId?.toString() === receiverId;
    }
    if (sender.role === 'trainer' && receiver.role === 'learner') {
        return receiver.trainerId?.toString() === senderId;
    }

    // 2. Learner <-> Gym Owner
    if (sender.role === 'learner' && receiver.role === 'gymowner') {
        return sender.gymId?.toString() === receiverId;
    }
    if (sender.role === 'gymowner' && receiver.role === 'learner') {
        return receiver.gymId?.toString() === senderId;
    }

    // 3. Trainer <-> Gym Owner
    if (sender.role === 'trainer' && receiver.role === 'gymowner') {
        return sender.gymId?.toString() === receiverId;
    }
    if (sender.role === 'gymowner' && receiver.role === 'trainer') {
        return receiver.gymId?.toString() === senderId;
    }

    return false;
};

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { receiverId, content } = req.body;
        const senderId = (req as any).user._id;

        if (!receiverId || !content) {
            return res.status(400).json({ message: 'Receiver ID and content are required' });
        }

        console.log('Send Message Request:', { senderId, receiverId, content });

        // Validate relationship
        const isValid = await validateRelationship(senderId, receiverId);
        console.log('Relationship validation result:', isValid);

        if (!isValid) {
            return res.status(403).json({ message: 'You are not authorized to message this user' });
        }

        // Find existing chat or create new one
        let chat = await Chat.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!chat) {
            chat = new Chat({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        // Add message
        chat.messages.push({
            sender: senderId,
            content,
            timestamp: new Date(),
            read: false
        });
        chat.lastMessage = new Date();

        await chat.save();

        res.status(200).json(chat);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getChats = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;

        const chats = await Chat.find({
            participants: userId
        })
            .sort({ lastMessage: -1 })
            .populate('participants', 'name avatar role email');

        // Format for frontend: exclude self from participants list for easier display
        const formattedChats = chats.map(chat => {
            const otherParticipant = chat.participants.find((p: any) => p._id.toString() !== userId.toString());
            return {
                _id: chat._id,
                otherParticipant,
                lastMessage: chat.messages[chat.messages.length - 1],
                unreadCount: chat.messages.filter((m: any) => !m.read && m.sender.toString() !== userId.toString()).length
            };
        });

        res.status(200).json(formattedChats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getChatHistory = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;
        const { chatId } = req.params;

        const chat = await Chat.findOne({
            _id: chatId,
            participants: userId
        }).populate('participants', 'name avatar role');

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Mark messages as read
        let updated = false;
        chat.messages.forEach((msg: any) => {
            if (!msg.read && msg.sender.toString() !== userId.toString()) {
                msg.read = true;
                updated = true;
            }
        });

        if (updated) {
            await chat.save();
        }

        res.status(200).json(chat);
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
