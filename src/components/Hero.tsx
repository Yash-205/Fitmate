import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full">
              Transform Your Body & Mind
            </div>
            <h1 className="text-gray-900">
              Your Personal Fitness Journey Starts Here
            </h1>
            <p className="text-gray-600">
              Get personalized coaching, custom workout plans, and expert guidance 
              tailored to your unique goals. Transform your life with our proven methodology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-gray-300">
                Learn More
              </Button>
            </div>
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-orange-600">5000+</div>
                <div className="text-gray-600">Active Members</div>
              </div>
              <div>
                <div className="text-orange-600">50+</div>
                <div className="text-gray-600">Expert Trainers</div>
              </div>
              <div>
                <div className="text-orange-600">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1573858129038-6f98c3cb2ac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5pbmclMjBneW18ZW58MXx8fHwxNzYxNDk1MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fitness Training"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-orange-600">⭐ 4.9/5</div>
              <div className="text-gray-600">Client Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
