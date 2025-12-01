import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Send, Sparkles, MessageCircle, Plus, Trash2, Menu, X } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useChat, Message } from "../contexts/ChatContext";
import api from "../services/api";



const QUICK_QUESTIONS = [
  "How do I start?",
  "Weight loss tips",
  "Build muscle",
  "Program pricing",
  "Nutrition advice",
  "Training schedule",
];

interface ChatbotPageProps {
  onBack?: () => void;
}

export function ChatbotPage({ onBack }: ChatbotPageProps) {
  const {
    messages,
    addMessage,
    conversations,
    currentConversationId,
    createNewConversation,
    switchConversation,
    updateConversationId,
    deleteConversation
  } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    try {
      const payload: any = { message: textToSend };
      if (currentConversationId && !currentConversationId.startsWith("new_")) {
        payload.conversationId = currentConversationId;
      }

      const response = await api.post('/chat/message', payload);
      const data = response.data;

      // Update conversation ID if it was a new chat
      if (data.conversationId && (!currentConversationId || currentConversationId.startsWith("new_"))) {
        updateConversationId(currentConversationId, data.conversationId);
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };
      addMessage(botResponse);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleNewChat = () => {
    createNewConversation();
    setShowSuggestions(true);
  };

  const handleDeleteConversation = (e: React.MouseEvent, convId: string) => {
    e.stopPropagation();
    if (conversations.length > 1 || window.confirm("Delete this conversation?")) {
      deleteConversation(convId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Page Title */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
            <MessageCircle className="h-8 w-8 text-orange-600" />
            FitCoach AI
            <Sparkles className="h-6 w-6 text-purple-600 animate-pulse" />
          </h1>
          <p className="text-gray-600 mt-2">Your 24/7 Fitness Assistant</p>
        </div>
      </div>

      {/* Main Container with Sidebar */}
      <div className="container mx-auto px-4 pb-8 max-w-7xl relative z-10">
        <div className="flex gap-4 h-[calc(100vh-280px)]">
          {/* Sidebar */}
          <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 overflow-hidden`}>
            <Card className="h-full shadow-xl border-2 border-orange-200 bg-white/95 backdrop-blur-sm flex flex-col">
              <div className="p-4 border-b border-orange-100">
                <Button
                  onClick={handleNewChat}
                  className="w-full bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => switchConversation(conv.id)}
                      className={`group relative p-3 rounded-lg cursor-pointer transition-all ${conv.id === currentConversationId
                        ? 'bg-gradient-to-r from-orange-100 to-purple-100 border border-orange-300'
                        : 'hover:bg-gray-100'
                        }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conv.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {conv.updatedAt.toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleDeleteConversation(e, conv.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="h-3 w-3 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Toggle Sidebar Button */}
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            variant="outline"
            size="icon"
            className="absolute left-4 top-0 z-20 md:hidden"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <Card className="flex-1 shadow-2xl border-2 border-orange-200 overflow-hidden backdrop-blur-sm bg-white/95">
              {/* Messages Area */}
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6 bg-gradient-to-br from-orange-50/20 via-white to-purple-50/20">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl p-4 transform hover:scale-102 transition-transform ${message.sender === "user"
                          ? "bg-gradient-to-r from-orange-600 to-purple-600 text-white shadow-xl"
                          : "bg-white text-gray-900 shadow-md border border-gray-100"
                          }`}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">
                          {message.text}
                        </p>
                        <span
                          className={`text-xs mt-2 block ${message.sender === "user"
                            ? "text-white/90"
                            : "text-gray-500"
                            }`}
                        >
                          {message.timestamp.toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  ))}

                  {showSuggestions && messages.length === 1 && (
                    <div className="space-y-4 mt-8">
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="h-4 w-4 text-orange-600" />
                        <p className="text-sm text-gray-700">Quick questions to get started:</p>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {QUICK_QUESTIONS.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickQuestion(question)}
                            className="px-4 py-3 bg-gradient-to-r from-orange-100 to-purple-100 border-2 border-orange-200 text-orange-700 rounded-xl hover:from-orange-200 hover:to-purple-200 hover:border-orange-400 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            <span className="text-sm">{question}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </Card>

            {/* Input Area */}
            <div className="mt-4">
              <Card className="p-4 shadow-2xl border-2 border-orange-300 bg-white">
                <div className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything about workouts, nutrition, programs..."
                    className="flex-1 text-base border-2 border-orange-200 focus:border-orange-500 rounded-xl bg-gradient-to-r from-orange-50/50 to-purple-50/50"
                    autoComplete="off"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    size="lg"
                    className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 shadow-xl px-8 transform hover:scale-105 transition-all"
                    disabled={!inputValue.trim() || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send
                      </>
                    )}
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <MessageCircle className="h-3 w-3 text-orange-600" />
                  <p className="text-xs text-gray-600">
                    Ask about workouts, nutrition, program recommendations, or anything fitness-related!
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
