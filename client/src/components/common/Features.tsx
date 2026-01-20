import { Target, Users, MessageCircle, Calendar, TrendingUp, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const services = [
{
  icon: Target,
  title: "Personalized Plans",
  description: "AI-generated workout and nutrition plans tailored to your goals and lifestyle.",
},
{
  icon: Users,
  title: "1-on-1 Coaching",
  description: "Certified trainers offering personalized guidance and accountability.",
},
{
  icon: MessageCircle,
  title: "AI Fitness Assistant",
  description: "24/7 AI chat support for quick fitness, diet, and workout solutions.",
},
{
  icon: Calendar,
  title: "Flexible Scheduling",
  description: "Daily to-dos, habit reminders, and quick micro workouts on your time.",
},
{
  icon: TrendingUp,
  title: "Progress Tracking",
  description: "Monitor habits and milestones with smart, AI-driven insights.",
},
{
  icon: Heart,
  title: "Holistic Approach",
  description: "Balanced fitness, nutrition, and mental wellness for long-term results.",
},

];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-600">
            Our comprehensive approach combines expert coaching, personalized programs,
            and cutting-edge tools to help you achieve your fitness goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-gray-200 hover:border-orange-600 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
