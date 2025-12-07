import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, User as UserIcon } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

interface Message {
    sender: string;
    content: string;
    timestamp: string;
    read: boolean;
}

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    recipientId: string;
    recipientName: string;
}

export function ChatModal({ isOpen, onClose, recipientId, recipientName }: ChatModalProps) {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen && recipientId) {
            fetchChatHistory();
        }
    }, [isOpen, recipientId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchChatHistory = async () => {
        try {
            setLoading(true);
            // First get all chats to find the correct chat ID
            const chatsResponse = await api.get('/peer-chat');
            const chats = chatsResponse.data as any[];

            const existingChat = chats.find((c: any) => c.otherParticipant._id === recipientId);

            if (existingChat) {
                const historyResponse = await api.get(`/peer-chat/${existingChat._id}`);
                setMessages((historyResponse.data as any).messages);
            } else {
                setMessages([]);
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const response = await api.post('/peer-chat/send', {
                receiverId: recipientId,
                content: newMessage
            });

            // Optimistically add message or use response
            // The response returns the full chat object with messages
            const updatedChat = response.data as any;
            setMessages(updatedChat.messages);
            setNewMessage("");
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 gap-0">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-orange-600" />
                        </div>
                        {recipientName}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                    {loading ? (
                        <div className="flex justify-center items-center h-full text-gray-400">
                            Loading...
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                            <p>No messages yet.</p>
                            <p>Start the conversation!</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => {
                            const isMe = msg.sender === user?._id;
                            return (
                                <div
                                    key={index}
                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${isMe
                                            ? 'bg-orange-600 text-white rounded-br-none'
                                            : 'bg-white border text-gray-800 rounded-bl-none'
                                            }`}
                                    >
                                        <p>{msg.content}</p>
                                        <p className={`text-[10px] mt-1 ${isMe ? 'text-orange-200' : 'text-gray-400'}`}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t bg-white">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1"
                        />
                        <Button type="submit" disabled={!newMessage.trim()} className="bg-orange-600 hover:bg-orange-700">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
