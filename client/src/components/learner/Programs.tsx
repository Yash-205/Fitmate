"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Check,
  Zap,
  TrendingUp,
  Trophy,
  Dumbbell,
  Target,
  Clock,
  Users,
  Star,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const programs = [
  {
    id: "basic",
    name: "FitMate Basic",
    tagline: "Essential Online Coaching",
    price: "₹500",
    duration: "/month",
    description: "Perfect for those starting their fitness journey with professional guidance.",
    features: [
      "Access to trainer guidance",
      "Comprehensive dashboard",
      "Progress tracking & analytics",
      "24/7 support",
      "Anytime chat with trainer",
      "1hr video calls/month",
    ],
    icon: Target,
    color: "from-blue-500 to-cyan-600",
    bgSoft: "bg-blue-50",
    bgIcon: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "border-blue-200 hover:border-blue-400",
    stats: [
      { label: "Support", value: "24/7 Available", icon: Users },
      { label: "Best For", value: "Beginners", icon: Star },
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "FitMate Premium",
    tagline: "Ultimate Fitness Experience",
    price: "₹1,500",
    duration: "/month",
    description: "For those who want the complete fitness package with gym access.",
    features: [
      "Access to partner gyms",
      "Dedicated personal trainer",
      "Unlimited video calls",
      "Priority support",
      "Custom workout plans",
      "Nutrition guidance",
    ],
    icon: Trophy,
    color: "from-purple-500 to-indigo-600",
    bgSoft: "bg-purple-50",
    bgIcon: "bg-purple-100",
    iconColor: "text-purple-600",
    border: "border-purple-200 hover:border-purple-400",
    stats: [
      { label: "Gym Access", value: "Included", icon: Dumbbell },
      { label: "Best Value", value: "Most Popular", icon: Star },
    ],
    popular: true,
  },
  {
    id: "gym-partnership",
    name: "Gym Partnership",
    tagline: "Grow Your Fitness Business",
    price: "₹15,000",
    duration: "+",
    description: "Exclusive partnership program for gyms to expand their reach.",
    features: [
      "Admin dashboard",
      "Gym promotion on platform",
      "Member management tools",
      "Business analytics",
      "Profit tracking",
      "24/7 support",
    ],
    icon: Users,
    color: "from-amber-500 to-orange-600",
    bgSoft: "bg-amber-50",
    bgIcon: "bg-amber-100",
    iconColor: "text-amber-600",
    border: "border-amber-200 hover:border-amber-400",
    stats: [
      { label: "For", value: "Gym Owners", icon: Users },
      { label: "Potential", value: "High Growth", icon: TrendingUp },
    ],
    popular: false,
  }
];

export function Programs() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    setSelectedProgram((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="programs"
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Subtle colored background */}
      <div className="absolute inset-0 bg-orange-50/30" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-5 border border-orange-100">
            <Zap className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-600">
              Premium Fitness Coaching
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent mb-6">
            Choose Your Transformation Journey
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Each program is designed to match your exact fitness level, lifestyle,
            and goals. Backed by real trainers & real results.
          </p>

          {/* Small Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <Benefit icon={<Users className="text-orange-600" />} label="Expert Trainers" />
            <Benefit icon={<Star className="text-orange-600" />} label="Proven Results" />
            <Benefit icon={<Target className="text-orange-600" />} label="Custom Plans" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {programs.map((p) => {
            const isSelected = selectedProgram === p.id;
            const isHovered = hovered === p.id;
            const Icon = p.icon;

            return (
              <Card
                key={p.id}
                onClick={() => toggleSelect(p.id)}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                className={`
    relative cursor-pointer overflow-hidden transition-all duration-500
    ${p.border} shadow-lg

    ${isHovered && !isSelected ? "scale-105 shadow-2xl" : ""}
    ${isSelected ? "!border-green-500 border-4 scale-105 shadow-2xl" : ""}
    ${p.popular && isSelected ? "md:scale-[1.03] border-green-400 shadow-xl" : ""}
    ${p.popular && !isSelected ? "shadow-xl" : ""}
  `}
              >




                {/* Popular label */}
                {p.popular && !isSelected && (
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-[20]">
                    <div className="bg-white rounded-full">
                      <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md animate-pulse">
                        <Star className="h-3 w-3 mr-1" /> Most Popular
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Selected label ... */}


                {/* Selected label */}
                {isSelected && (
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 shadow-md">
                      <Check className="h-3 w-3 mr-1" /> Selected
                    </Badge>
                  </div>
                )}

                {/* Soft gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-10 transition-all`}
                />

                {/* Header */}
                <div className={`${p.bgSoft} px-6 py-8`}>
                  <div
                    className={`w-16 h-16 ${p.bgIcon} rounded-2xl mx-auto flex items-center justify-center transition-all duration-300 ${isSelected ? "scale-110 " : "group-hover:scale-110"
                      }`}
                  >
                    <Icon className={`w-8 h-8 ${p.iconColor}`} />
                  </div>

                  <div className="text-center mt-4">
                    <CardTitle className="text-xl font-semibold">
                      {p.name}
                    </CardTitle>
                    <p className="text-gray-600 text-sm">{p.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <CardHeader className="text-center pb-4">
                  <CardDescription className="mb-3">
                    {p.description}
                  </CardDescription>

                  <div className="mb-4">
                    <span
                      className={`text-3xl font-bold bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}
                    >
                      {p.price}
                    </span>
                    <span className="text-gray-500">{p.duration}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    {p.stats.map((s, i) => {
                      const SIcon = s.icon;
                      return (
                        <div
                          key={i}
                          className={`${p.bgSoft} border ${p.border.split(" ")[0]} rounded-lg p-3`}
                        >
                          <SIcon
                            className={`h-4 w-4 mx-auto mb-1 ${p.iconColor}`}
                          />
                          <p className="text-xs text-gray-600">{s.label}</p>
                          <p className="text-sm font-medium">{s.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardHeader>

                {/* Features */}
                <CardContent className="space-y-3">
                  {p.features.map((f, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                      style={{ animationDelay: `${index * 40}ms` }}
                    >
                      <div
                        className={`
                          w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 
                          ${isSelected
                            ? "bg-green-100 text-green-700 scale-110 ring-2 ring-green-200"
                            : `${p.bgIcon} ${p.iconColor} group-hover:scale-110`
                          }
                        `}
                      >
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-gray-700">{f}</span>
                    </div>
                  ))}
                </CardContent>

                {/* CTA */}
                <CardFooter className="pt-6">
                  <Button
                    variant={isSelected || p.popular ? "default" : "outline"}
                    className={`
                      w-full relative overflow-hidden transition-all duration-300
                      ${isSelected
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : p.popular
                          ? "bg-gradient-to-r from-orange-400 to-red-500 text-white"
                          : ""
                      }
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSelect(p.id);
                    }}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4 mr-1" /> Selected
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-1" /> Get Started
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <div className="p-10 bg-gradient-to-r from-orange-100 to-purple-100 rounded-2xl border border-orange-200">
            <h3 className="text-xl font-semibold mb-3">Not sure where to start?</h3>
            <p className="text-gray-600 mb-6">
              Talk to our expert trainers to select the perfect plan that fits
              your goals & lifestyle.
            </p>

            <Button className="bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-all">
              <Users className="h-4 w-4 mr-2" /> Talk to a Trainer
            </Button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            ["5,000+", "Active Members"],
            ["98%", "Success Rate"],
            ["50+", "Expert Trainers"],
            ["10+", "Years Experience"],
          ].map(([num, label], i) => (
            <div key={i} className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all text-center">
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-1">{num}</p>
              <p className="text-sm text-gray-500 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">FitMate</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Your personal fitness companion for a healthier, stronger you.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Programs</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors text-sm">Basic Plan</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors text-sm">Premium Plan</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors text-sm">Gym Partnership</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors text-sm">About Us</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors text-sm">Trainers</a></li>
                  <li><a href="#" className="text-gray-500 hover:text-orange-500 transition-colors text-sm">Testimonials</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-4 text-lg">Contact Us</h4>
                <ul className="space-y-3 text-gray-500 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>support@fitmate.com</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>+91 98765 43210</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Mumbai, India</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-12 pt-8 text-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} FitMate. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

/* Small reusable benefit chip */
function Benefit({ icon, label }: any) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
      {icon}
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}
