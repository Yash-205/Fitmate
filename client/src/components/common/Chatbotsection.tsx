import { MessageCircle, Sparkles, Zap, Clock, Brain, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface ChatbotSectionProps {
  onNavigateToChatbot: () => void;
}

export function ChatbotSection({ onNavigateToChatbot }: ChatbotSectionProps) {
  const features = [
    {
      icon: Zap,
      title: "Instant Answers",
      description: "Get immediate responses to your fitness questions, 24/7"
    },
    {
      icon: Brain,
      title: "Smart Recommendations",
      description: "AI-powered program and workout suggestions tailored to you"
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "No waiting for callbacks or appointments - chat anytime"
    },
    {
      icon: Users,
      title: "Expert Knowledge",
      description: "Trained on insights from certified fitness professionals"
    }
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements - matching Programs */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-purple-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-purple-100 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-orange-600" />
              <span className="text-sm text-gray-700">FREE AI Fitness Coach</span>
            </div>

            <h2 className="text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-purple-600">
              Meet Your 24/7 AI Fitness Coach
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              Get instant, expert fitness guidance powered by AI. Whether you're wondering about 
              workouts, nutrition, or which program is right for you - our chatbot has the answers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-100 to-purple-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-orange-200">
                        <Icon className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={onNavigateToChatbot}
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start Chatting Now
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  Learn More
                </Button>
              </div>

              <div className="mt-6 bg-gradient-to-r from-orange-100 to-purple-100 rounded-lg p-4 border border-orange-200">
                <p className="text-sm text-gray-700">
                  ✨ <strong className="text-orange-700">100% Free Forever</strong> - No credit card required
                </p>
              </div>
            </div>

            {/* Right Side - Chat Preview */}
            <div className="relative">
              <Card className="bg-white backdrop-blur-lg shadow-2xl border-2 border-orange-200 overflow-hidden transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-orange-600 to-purple-600 text-white p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-white flex items-center gap-2">
                      FitCoach AI
                      <Sparkles className="h-4 w-4 text-yellow-300" />
                    </h4>
                    <p className="text-xs text-white/90">Always here to help</p>
                  </div>
                  <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 rounded-full text-xs shadow-lg">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>

                {/* Sample Messages */}
                <div className="p-6 space-y-4 max-h-96 overflow-hidden bg-gradient-to-br from-orange-50/30 to-purple-50/30">
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl p-3 max-w-[80%] shadow-md border border-gray-100">
                      <p className="text-sm text-gray-900">
                        Hi! I'm here to help you with workouts, nutrition, and program recommendations. What would you like to know?
                      </p>
                      <span className="text-xs text-gray-500 mt-1 block">Just now</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-orange-600 to-purple-600 text-white rounded-2xl p-3 max-w-[80%] shadow-lg">
                      <p className="text-sm">How do I start losing weight?</p>
                      <span className="text-xs text-white/90 mt-1 block">Just now</span>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl p-3 max-w-[80%] shadow-md border border-gray-100">
                      <p className="text-sm text-gray-900">
                        Great goal! For effective weight loss, combine cardio 3-4 times/week with strength training 2-3 times/week. Focus on a caloric deficit through balanced nutrition. Our Weight Loss Program provides structured guidance!
                      </p>
                      <span className="text-xs text-gray-500 mt-1 block">Just now</span>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl p-3 shadow-md border border-gray-100">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gradient-to-r from-orange-600 to-purple-600 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-gradient-to-r from-orange-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        <span className="w-2 h-2 bg-gradient-to-r from-orange-600 to-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Preview */}
                <div className="border-t border-orange-100 p-4 bg-white">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-purple-50 border-2 border-orange-200 rounded-xl p-3 hover:border-orange-400 transition-colors">
                    <span className="text-gray-400 text-sm flex-1">Ask me anything about fitness...</span>
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full shadow-xl transform rotate-12 animate-pulse">
                <p className="text-xs flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Try it free!
                </p>
              </div>
            </div>
          </div>

          {/* Stats - matching Programs style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="text-center bg-white rounded-xl p-4 shadow-lg border border-orange-100">
              <div className="text-3xl bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">10K+</div>
              <div className="text-sm text-gray-600">Questions Answered</div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-lg border border-orange-100">
              <div className="text-3xl bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-sm text-gray-600">Always Available</div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-lg border border-orange-100">
              <div className="text-3xl bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">{"<1s"}</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 shadow-lg border border-orange-100">
              <div className="text-3xl bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-sm text-gray-600">Free to Use</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
