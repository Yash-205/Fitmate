import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { MessageCircle, X, Send } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: "0",
  text: "Hi! I'm your FitCoach AI assistant. I can help you with workout recommendations, nutrition tips, and answer questions about our programs. How can I assist you today?",
  sender: "bot",
  timestamp: new Date(),
};

const FITNESS_RESPONSES: { [key: string]: string[] } = {
  "weight loss": [
    "Great goal! For effective weight loss, I recommend combining cardio exercises (3-4 times/week) with strength training (2-3 times/week). Focus on a caloric deficit through balanced nutrition, and consider our Weight Loss Program for structured guidance.",
    "Weight loss is a journey! Key factors include creating a sustainable calorie deficit, staying consistent with your workouts, and managing stress. Our Weight Loss Program provides meal plans and workouts designed for long-term success. Want to know more?",
    "To lose weight effectively, focus on both diet and exercise. I suggest tracking your calories, incorporating both cardio and resistance training, and getting adequate sleep. Our trainers can help you create a personalized plan!",
  ],
  "muscle gain": [
    "Building muscle requires progressive overload and proper nutrition. Aim for 4-5 strength training sessions per week, ensure adequate protein intake (1.6-2.2g per kg of body weight), and get plenty of rest. Check out our Muscle Building Program!",
    "Muscle gain is all about consistency! Focus on compound movements, gradually increase your weights, and fuel your body with adequate protein. Our Muscle Building Program is designed to maximize your gains safely.",
    "To build muscle effectively, you need three things: progressive resistance training, sufficient protein intake, and proper recovery. Our trainers can help you optimize all three areas!",
  ],
  "muscle building": [
    "Building muscle requires progressive overload and proper nutrition. Aim for 4-5 strength training sessions per week, ensure adequate protein intake (1.6-2.2g per kg of body weight), and get plenty of rest. Check out our Muscle Building Program!",
    "Muscle gain is all about consistency! Focus on compound movements, gradually increase your weights, and fuel your body with adequate protein. Our Muscle Building Program is designed to maximize your gains safely.",
    "To build muscle effectively, you need three things: progressive resistance training, sufficient protein intake, and proper recovery. Our trainers can help you optimize all three areas!",
  ],
  beginner: [
    "Welcome to your fitness journey! Start with 3 sessions per week focusing on basic compound movements like squats, push-ups, and rows. Our Beginner Program is designed specifically for people new to fitness.",
    "Starting out is exciting! I recommend beginning with bodyweight exercises to build a foundation, then gradually adding weights. Focus on learning proper form before increasing intensity. Want some specific exercises to try?",
    "As a beginner, the most important thing is building consistent habits! Start small with 2-3 sessions per week, focus on basic movements, and don't be afraid to ask our trainers for guidance.",
  ],
  nutrition: [
    "Nutrition is 70% of your results! Focus on whole foods, adequate protein, healthy fats, and complex carbs. Stay hydrated and consider meal prepping. Would you like specific macro recommendations?",
    "Good nutrition fuels your workouts and recovery! I recommend eating plenty of vegetables, lean proteins, whole grains, and healthy fats. Avoid processed foods and sugary drinks. Need help with meal planning?",
    "Nutrition can seem complex, but keep it simple: eat real food, watch your portions, get enough protein, and stay hydrated. Our programs include nutrition guidance to help you succeed!",
  ],
  cardio: [
    "Cardio is great for heart health and calorie burning! Mix HIIT (High-Intensity Interval Training) with steady-state cardio. Aim for 150 minutes of moderate or 75 minutes of vigorous cardio per week.",
    "Cardiovascular exercise strengthens your heart and burns calories! Try mixing different types: running, cycling, swimming, or rowing. Variety keeps it interesting and works different muscle groups.",
    "For optimal cardio benefits, combine short high-intensity sessions with longer moderate-intensity workouts. This approach improves both aerobic and anaerobic fitness!",
  ],
  strength: [
    "Strength training builds muscle, boosts metabolism, and improves bone density. Focus on progressive overload, compound movements, and proper form. Our trainers can create a personalized plan for you!",
    "Strength training is essential for everyone, not just bodybuilders! It increases metabolism, strengthens bones, and improves daily function. Start with basic movements and progress gradually.",
    "Building strength takes time and consistency. Focus on major compound lifts like squats, deadlifts, and bench press. Our trainers can teach you perfect form to maximize results and prevent injury!",
  ],
  program: [
    "We offer several programs: Weight Loss, Muscle Building, and Athletic Performance. Each is designed by certified trainers with progressive workouts and nutrition guidance. Would you like to know more about a specific program?",
    "Our programs are tailored to different goals! Whether you want to lose weight, build muscle, or improve athletic performance, we have expert-designed plans. Which goal interests you most?",
    "Each of our programs includes personalized workout plans, nutrition guidance, and trainer support. They're designed to be flexible and adapt to your progress. Want details on any specific program?",
  ],
  trainer: [
    "All our trainers are certified professionals with years of experience. They specialize in different areas like strength training, weight loss, yoga, and athletic performance. You can book a consultation to find the perfect match!",
    "Our trainers are passionate experts who've helped hundreds achieve their goals! Each has unique specialties - from Olympic lifting to yoga. Want to see our trainer profiles?",
    "We carefully select trainers who are not only certified but also great motivators and educators. They'll customize your program and support you every step of the way!",
  ],
  pricing: [
    "We offer flexible pricing options including monthly memberships, program packages, and personal training sessions. Click 'Get Started' to view our current offers and choose what works best for you!",
    "Our pricing is designed to fit different budgets and goals. Options range from self-guided programs to one-on-one training. Check out the 'Choose Your Program' section for current pricing!",
    "We have three main program tiers: Weight Loss ($79/month), Muscle Building ($129/month), and Athletic Performance ($199/month). Each includes different levels of support and features!",
  ],
  price: [
    "We offer flexible pricing options including monthly memberships, program packages, and personal training sessions. Click 'Get Started' to view our current offers and choose what works best for you!",
    "Our pricing is designed to fit different budgets and goals. Options range from self-guided programs to one-on-one training. Check out the 'Choose Your Program' section for current pricing!",
    "We have three main program tiers: Weight Loss ($79/month), Muscle Building ($129/month), and Athletic Performance ($199/month). Each includes different levels of support and features!",
  ],
  cost: [
    "We offer flexible pricing options including monthly memberships, program packages, and personal training sessions. Click 'Get Started' to view our current offers and choose what works best for you!",
    "Our pricing is designed to fit different budgets and goals. Options range from self-guided programs to one-on-one training. Check out the 'Choose Your Program' section for current pricing!",
    "We have three main program tiers: Weight Loss ($79/month), Muscle Building ($129/month), and Athletic Performance ($199/month). Each includes different levels of support and features!",
  ],
  schedule: [
    "We recommend consistency over perfection! Beginners should aim for 3 sessions/week, intermediate 4-5 sessions/week. Listen to your body and ensure adequate recovery between workouts.",
    "Your training schedule should fit your lifestyle and recovery needs. Most people see great results with 3-5 sessions per week, but quality matters more than quantity!",
    "Finding the right schedule is personal! Start with 3 days per week and adjust based on how you feel. Remember, rest days are when your muscles actually grow!",
  ],
  hello: [
    "Hello! 👋 I'm excited to help you on your fitness journey. What would you like to know about?",
    "Hey there! 👋 Great to see you! I'm here to answer any fitness questions you have. What's on your mind?",
    "Hi! 👋 Welcome back! How can I help you reach your fitness goals today?",
  ],
  hi: [
    "Hi there! 👋 Ready to crush your fitness goals? How can I help you today?",
    "Hey! 👋 Nice to chat with you! What fitness questions can I answer for you?",
    "Hello! 👋 I'm here to help with your fitness journey. What would you like to discuss?",
  ],
  hey: [
    "Hey! 👋 Great to hear from you! What can I help you with today?",
    "Hi there! 👋 I'm here to answer your fitness questions. What's up?",
    "Hello! 👋 Ready to talk fitness? How can I assist you?",
  ],
  help: [
    "I can help you with:\n• Workout recommendations\n• Program information\n• Nutrition tips\n• Training schedules\n• Trainer information\n• General fitness questions\n\nWhat would you like to know?",
    "I'm here to assist with:\n• Creating workout plans\n• Nutrition guidance\n• Choosing the right program\n• Training advice\n• Recovery tips\n\nWhat topic interests you?",
    "Happy to help! I can answer questions about:\n• Exercise techniques\n• Program details\n• Nutrition strategies\n• Training frequency\n• Our trainers\n\nWhat's your question?",
  ],
  thanks: [
    "You're welcome! 😊 Feel free to ask if you have more questions!",
    "Happy to help! Let me know if there's anything else you'd like to know.",
    "My pleasure! I'm here anytime you need fitness advice or information.",
  ],
  "thank you": [
    "You're welcome! 😊 Feel free to ask if you have more questions!",
    "Happy to help! Let me know if there's anything else you'd like to know.",
    "My pleasure! I'm here anytime you need fitness advice or information.",
  ],
  gym: [
    "Our gym locations are equipped with state-of-the-art equipment and staffed by expert trainers! We have multiple locations to serve you. Check out the Gyms page to find one near you!",
    "We have several premium gym locations with top-tier equipment and facilities. Each location has certified trainers and a supportive community. Want to visit one?",
    "Our gyms feature modern equipment, clean facilities, and expert trainers ready to help you succeed. Browse our locations to find the perfect fit for you!",
  ],
  yoga: [
    "Yoga is excellent for flexibility, balance, and mental wellness! It complements strength training perfectly. Many of our trainers incorporate yoga into their programs.",
    "We love yoga! It improves flexibility, reduces stress, and enhances mind-body connection. It's a great addition to any fitness routine!",
    "Yoga offers numerous benefits including improved flexibility, better posture, and stress relief. Consider adding it to your weekly routine!",
  ],
};

// Track conversation context (using a simple counter for each topic)
const conversationContext: { [key: string]: number } = {};

function getBotResponse(userMessage: string, messageId: string): string {
  const message = userMessage.toLowerCase();
  let selectedKeyword = "";
  
  // Check for exact matches or partial matches in keywords
  for (const [keyword] of Object.entries(FITNESS_RESPONSES)) {
    if (message.includes(keyword)) {
      selectedKeyword = keyword;
      break;
    }
  }

  // If keyword found, rotate through responses using message ID for uniqueness
  if (selectedKeyword && FITNESS_RESPONSES[selectedKeyword]) {
    const responses = FITNESS_RESPONSES[selectedKeyword];
    const currentIndex = conversationContext[selectedKeyword] || 0;
    const response = responses[currentIndex % responses.length];
    // Increment for next time
    conversationContext[selectedKeyword] = currentIndex + 1;
    return response;
  }

  // Default responses for common questions with variations
  if (message.includes("how") && message.includes("start")) {
    const responses = [
      "Starting your fitness journey is exciting! First, define your goals. Then, start with 3 workouts per week focusing on basic movements. Our Beginner Program provides a perfect structured approach. Would you like to know more?",
      "Great question! Begin by assessing your current fitness level and setting realistic goals. Start slowly with 2-3 workouts per week and build from there. Want help choosing the right program?",
      "The best way to start is to just begin! Pick activities you enjoy, start with manageable frequency, and focus on building the habit. Our trainers can help you create a personalized starting plan!",
    ];
    const index = conversationContext["start"] || 0;
    conversationContext["start"] = index + 1;
    return responses[index % responses.length];
  }

  if (message.includes("how long") || message.includes("how much time")) {
    const responses = [
      "Results vary by individual, but with consistent effort, you can expect to see initial changes in 4-6 weeks and significant results in 12-16 weeks. The key is consistency and progressive overload!",
      "Everyone's timeline is different! Generally, you'll feel stronger in 2-3 weeks, see visible changes in 4-6 weeks, and experience major transformations in 12+ weeks. Patience and consistency are key!",
      "Most people notice improvements in energy and strength within the first month. Physical changes typically appear around 6-8 weeks. Long-term transformations require 3-6 months of dedicated effort!",
    ];
    const index = conversationContext["timeline"] || 0;
    conversationContext["timeline"] = index + 1;
    return responses[index % responses.length];
  }

  if (message.includes("diet") || message.includes("eat")) {
    const responses = [
      "A balanced diet with whole foods is essential! Focus on lean proteins, complex carbs, healthy fats, and plenty of vegetables. Avoid processed foods and stay hydrated. Each of our programs includes nutrition guidance tailored to your goals.",
      "Nutrition is crucial for results! Prioritize whole foods like lean meats, fish, whole grains, fruits, and vegetables. Limit sugar and processed foods. Want specific meal ideas?",
      "For optimal results, eat protein at every meal, include plenty of vegetables, choose whole grains, and don't fear healthy fats. Our programs provide detailed nutrition plans!",
    ];
    const index = conversationContext["diet"] || 0;
    conversationContext["diet"] = index + 1;
    return responses[index % responses.length];
  }

  if (message.includes("rest") || message.includes("recovery")) {
    const responses = [
      "Recovery is crucial! Aim for 7-9 hours of sleep, include 1-2 rest days per week, stay hydrated, and consider active recovery like walking or yoga. Your muscles grow during rest, not just during workouts!",
      "Don't underestimate rest! Quality sleep, proper hydration, and rest days are when your body adapts and gets stronger. Listen to your body and don't overtrain!",
      "Recovery is where the magic happens! Focus on sleep quality, stress management, proper nutrition, and active recovery. Your body needs time to rebuild stronger!",
    ];
    const index = conversationContext["recovery"] || 0;
    conversationContext["recovery"] = index + 1;
    return responses[index % responses.length];
  }

  if (message.includes("workout") && !message.includes("how")) {
    const responses = [
      "Workouts should be tailored to your goals! Whether you want strength, endurance, or weight loss, we can design the perfect program. What's your primary fitness goal?",
      "Great workouts include a mix of strength training, cardio, and flexibility work. Our programs are designed to give you balanced, effective workouts. Interested in learning more?",
      "The best workout is one you'll stick to! We offer various training styles to keep things interesting and effective. Want recommendations based on your goals?",
    ];
    const index = conversationContext["workout"] || 0;
    conversationContext["workout"] = index + 1;
    return responses[index % responses.length];
  }

  // Varied default fallback responses
  const fallbackResponses = [
    "That's a great question! While I can provide general guidance on workouts, nutrition, and our programs, for personalized advice specific to your needs, I recommend booking a consultation with one of our certified trainers. They can create a custom plan just for you!",
    "I'd love to give you more specific guidance on that! For detailed, personalized advice, our certified trainers are available for consultations. They can assess your individual situation and create a customized plan. Interested?",
    "Interesting question! I can provide general fitness information, but for tailored advice that fits your unique goals and situation, I recommend connecting with one of our expert trainers. Want to learn more about our training options?",
    "Good question! I'm here for general guidance, but every person's fitness journey is unique. Our certified trainers can provide personalized recommendations based on your specific needs. Shall I tell you more about our trainers?",
    "I appreciate your question! While I can offer general fitness advice, our certified trainers can give you personalized guidance that's perfect for your specific situation. Would you like to explore our programs?",
  ];
  
  const index = conversationContext["fallback"] || 0;
  conversationContext["fallback"] = index + 1;
  return fallbackResponses[index % fallbackResponses.length];
}

const QUICK_QUESTIONS = [
  "How do I start?",
  "Weight loss tips",
  "Build muscle",
  "Program pricing",
  "Nutrition advice",
  "Training schedule",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    INITIAL_MESSAGE,
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
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

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    // Hide suggestions after first message
    setShowSuggestions(false);

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Refocus input immediately
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    // Simulate bot response with a slight delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(textToSend, userMessage.id),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      
      // Refocus input after bot response
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }, 500);
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
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg bg-orange-600 hover:bg-orange-700 text-white"
          size="icon"
          title="Chat with FitCoach AI"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[380px] h-[500px] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-orange-600 text-white p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-orange-700">
                <AvatarFallback className="bg-orange-700 text-white">
                  FC
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white">FitCoach AI</h3>
                <p className="text-xs text-orange-100">
                  Online
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-orange-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">
                      {message.text}
                    </p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.sender === "user"
                          ? "text-orange-100"
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
                  <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {QUICK_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="px-3 py-1.5 text-xs bg-white border border-orange-200 text-orange-600 rounded-full hover:bg-orange-50 hover:border-orange-400 transition-colors"
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
          <div className="border-t p-4 bg-white flex-shrink-0">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1"
                autoComplete="off"
              />
              <Button
                onClick={() => handleSendMessage()}
                size="icon"
                className="bg-orange-600 hover:bg-orange-700 flex-shrink-0"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Ask about workouts, nutrition, or our programs!
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
