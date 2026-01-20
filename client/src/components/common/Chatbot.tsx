import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useChat, Message } from "../../contexts/ChatContext";
import api from "../../services/api";



const QUICK_QUESTIONS = [
  "How do I start?",
  "Weight loss tips",
  "Build muscle",
  "Program pricing",
  "Nutrition advice",
  "Training schedule",
];

export function Chatbot() {
  const { messages, addMessage, currentConversationId, updateConversationId } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    // Hide suggestions after first message
    setShowSuggestions(false);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputValue("");
    setIsLoading(true);

    // Refocus input immediately
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    try {
      // Call backend API
      const payload: any = { message: textToSend };
      // For the floating chatbot, we might want to just use the default/last conversation or create new
      // If we want to share state with the page, we use the same context.
      if (currentConversationId && !currentConversationId.startsWith("new_")) {
        payload.conversationId = currentConversationId;
      }

      const response = await api.post('/chat/message', payload);
      const data = response.data as { conversationId: string; response: string };

      if (data.conversationId && (!currentConversationId || currentConversationId.startsWith("new_"))) {
        updateConversationId(currentConversationId, data.conversationId);
      }



      // Add bot response
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: "bot",
        timestamp: new Date(),
      };
      addMessage(botResponse);
    } catch (error) {
      console.error('Chat error:', error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
      // Refocus input after bot response
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

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white transform hover:scale-110 transition-all animate-pulse"
          size="icon"
          title="Chat with FitCoach AI"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-40 w-[380px] max-h-[calc(100vh-100px)] h-[600px] shadow-2xl flex flex-col border-2 border-orange-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-purple-600 text-white p-2.5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-white/20 border border-white/30">
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-purple-500 text-white text-xs">
                  FC
                </AvatarFallback>
              </Avatar>
              <h3 className="text-sm font-semibold text-white flex items-center gap-1">
                FitCoach AI
                <Sparkles className="h-3 w-3 text-yellow-300" />
              </h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 overflow-y-auto bg-gradient-to-br from-orange-50/30 via-white to-purple-50/30">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${message.sender === "user"
                      ? "bg-gradient-to-r from-orange-600 to-purple-600 text-white shadow-lg"
                      : "bg-white text-gray-900 shadow-md border border-gray-100"
                      }`}
                  >
                    <p className="text-sm whitespace-pre-line">
                      {message.text}
                    </p>
                    <span
                      className={`text-xs mt-1 block ${message.sender === "user"
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

              {/* Quick Question Suggestions */}
              {showSuggestions && messages.length === 1 && (
                <div className="space-y-2 mt-4">
                  <p className="text-xs text-gray-600 text-center flex items-center justify-center gap-1">
                    <Sparkles className="h-3 w-3 text-orange-600" />
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {QUICK_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="px-3 py-1.5 text-xs bg-gradient-to-r from-orange-100 to-purple-100 border border-orange-200 text-orange-700 rounded-full hover:from-orange-200 hover:to-purple-200 hover:border-orange-400 transition-all shadow-sm hover:shadow-md"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-orange-100 p-4 bg-white flex-shrink-0">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 border-orange-200 focus:border-orange-400 rounded-xl"
                autoComplete="off"
              />
              <Button
                onClick={() => handleSendMessage()}
                size="icon"
                className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 flex-shrink-0 shadow-lg"
                disabled={!inputValue.trim() || isLoading}
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
              <MessageCircle className="h-3 w-3 text-orange-600" />
              Ask about workouts, nutrition, or our programs!
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
