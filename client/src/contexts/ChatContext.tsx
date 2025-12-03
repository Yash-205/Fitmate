import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";
import api from "../services/api";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface ChatContextType {
  // Current conversation
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;

  // Conversation management
  conversations: Conversation[];
  currentConversationId: string;
  createNewConversation: () => void;
  switchConversation: (conversationId: string) => void;
  updateConversationId: (oldId: string, newId: string) => void;
  deleteConversation: (conversationId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const INITIAL_MESSAGE: Message = {
  id: "0",
  text: "Hi! I'm your FitCoach AI assistant. I can help you with workout recommendations, nutrition tips, and answer questions about our programs. How can I assist you today?",
  sender: "bot",
  timestamp: new Date(),
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string>("");

  // Fetch conversations when user changes
  useEffect(() => {
    if (user) {
      fetchConversations();
    } else {
      setConversations([]);
      setCurrentConversationId("");
    }
  }, [user]);

  const fetchConversations = async () => {
    try {
      const response = await api.get('/chat/conversations');
      const fetchedConversations = response.data as any[];

      if (fetchedConversations.length > 0) {
        // Map backend conversations to frontend format (messages will be fetched on demand or we can fetch latest)
        // For list view we only need title and id.
        // We'll fetch full conversation details when switching.

        const mappedConversations: Conversation[] = fetchedConversations.map((conv: any) => ({
          id: conv._id,
          title: conv.title,
          messages: [], // Will be populated when selected
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt)
        }));

        setConversations(mappedConversations);
        // Select the most recent one
        if (mappedConversations.length > 0) {
          switchConversation(mappedConversations[0].id);
        }
      } else {
        // No conversations, create a placeholder in UI but don't save to backend yet
        createNewConversation();
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await api.get(`/chat/${conversationId}`);
      const conversationData = response.data as any;

      const mappedMessages: Message[] = conversationData.messages.map((msg: any, index: number) => ({
        id: msg._id || index.toString(),
        text: msg.content,
        sender: msg.role === 'assistant' ? 'bot' : 'user',
        timestamp: new Date(msg.timestamp)
      }));

      setConversations(prev => prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: mappedMessages,
            updatedAt: new Date(conversationData.updatedAt)
          };
        }
        return conv;
      }));
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // Get current conversation messages
  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const messages = currentConversation?.messages || [];

  const addMessage = (message: Message) => {
    // Optimistic update
    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          updatedAt: new Date(),
        };
      }
      return conv;
    }));
  };

  const clearMessages = () => {
    // Not really used anymore with multiple conversations, maybe for "New Chat" state
  };

  const createNewConversation = () => {
    // Create a temporary conversation in frontend
    // It will be persisted to backend when first message is sent
    const tempId = "new_" + Date.now();
    const newConv: Conversation = {
      id: tempId,
      title: "New Chat",
      messages: [INITIAL_MESSAGE],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations(prev => [newConv, ...prev]);
    setCurrentConversationId(tempId);
  };

  // Update conversation ID in local state
  const updateConversationId = (oldId: string, newId: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === oldId) {
        return { ...conv, id: newId };
      }
      return conv;
    }));
    if (currentConversationId === oldId) {
      setCurrentConversationId(newId);
    }
  };

  const switchConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    // If it's not a temporary new chat, fetch messages
    if (!conversationId.startsWith("new_")) {
      fetchMessages(conversationId);
    }
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      if (!conversationId.startsWith("new_")) {
        await api.delete(`/chat/${conversationId}`);
      }

      setConversations(prev => {
        const filtered = prev.filter(c => c.id !== conversationId);
        if (conversationId === currentConversationId) {
          if (filtered.length > 0) {
            setCurrentConversationId(filtered[0].id);
            if (!filtered[0].id.startsWith("new_")) {
              fetchMessages(filtered[0].id);
            }
          } else {
            createNewConversation();
          }
        }
        return filtered;
      });
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  return (
    <ChatContext.Provider value={{
      messages,
      addMessage,
      clearMessages,
      conversations,
      currentConversationId,
      createNewConversation,
      switchConversation,
      updateConversationId,
      deleteConversation,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
