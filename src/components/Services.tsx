import { Target, Users, Zap, Calendar, TrendingUp, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const services = [
  {
    icon: Target,
    title: "Personalized Plans",
    description: "Custom workout and nutrition plans designed specifically for your body type, goals, and lifestyle.",
  },
  {
    icon: Users,
    title: "1-on-1 Coaching",
    description: "Direct access to certified trainers who guide and motivate you every step of the way.",
  },
  {
    icon: Zap,
    title: "Quick Results",
    description: "Our proven methodology delivers visible results in as little as 4 weeks with consistency.",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Train on your schedule with on-demand workouts and live sessions available 24/7.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Advanced analytics and tracking tools to monitor your transformation journey.",
  },
  {
    icon: Heart,
    title: "Holistic Approach",
    description: "Focus on fitness, nutrition, mental wellness, and sustainable lifestyle changes.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
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
