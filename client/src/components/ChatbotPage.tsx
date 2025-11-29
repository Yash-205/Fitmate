import { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Send, ArrowLeft, Sparkles, MessageCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useChat, Message } from "../contexts/ChatContext";

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

const conversationContext: { [key: string]: number } = {};

function getBotResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();
  let selectedKeyword = "";

  for (const [keyword] of Object.entries(FITNESS_RESPONSES)) {
    if (message.includes(keyword)) {
      selectedKeyword = keyword;
      break;
    }
  }

  if (selectedKeyword && FITNESS_RESPONSES[selectedKeyword]) {
    const responses = FITNESS_RESPONSES[selectedKeyword];
    const currentIndex = conversationContext[selectedKeyword] || 0;
    const response = responses[currentIndex % responses.length];
    conversationContext[selectedKeyword] = currentIndex + 1;
    return response;
  }

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

interface ChatbotPageProps {
  onBack?: () => void;
}

export function ChatbotPage({ onBack }: ChatbotPageProps) {
  const { messages, addMessage } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInputValue("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(textToSend),
        sender: "bot",
        timestamp: new Date(),
      };
      addMessage(botResponse);

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements - matching Programs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-purple-600 text-white py-6 sticky top-0 z-50 shadow-2xl relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 bg-white/20 border-2 border-white/30">
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-purple-500 text-white">
                  <MessageCircle className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-white text-xl flex items-center gap-2">
                  FitCoach AI
                  <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
                </h1>
                <p className="text-sm text-white/90">Your 24/7 Fitness Assistant</p>
              </div>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 rounded-full text-sm shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Always Online
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        <Card className="shadow-2xl border-2 border-orange-200 overflow-hidden backdrop-blur-sm bg-white/95" style={{ height: 'calc(100vh - 250px)' }}>
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
                disabled={!inputValue.trim()}
              >
                <Send className="h-5 w-5 mr-2" />
                Send
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
  );
}
