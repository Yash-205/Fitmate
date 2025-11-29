"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
} from "lucide-react";

const programs = [
  {
    id: "weight-loss",
    name: "Weight Loss",
    tagline: "Transform Your Body",
    price: "$79",
    duration: "/month",
    description: "Perfect for beginners looking to reduce weight sustainably.",
    features: [
      "Custom meal plans",
      "4 weekly workouts",
      "Progress tracking",
      "Email support",
      "Nutrition guides",
    ],
    icon: Target,
    color: "from-green-500 to-emerald-600",
    bgSoft: "bg-green-50",
    bgIcon: "bg-green-100",
    iconColor: "text-green-600",
    border: "border-green-200 hover:border-green-400",
    stats: [
      { label: "Avg. Weight Loss", value: "15–25 lbs", icon: TrendingUp },
      { label: "Program Length", value: "12 weeks", icon: Clock },
    ],
    popular: false,
  },
  {
    id: "muscle-building",
    name: "Muscle Building",
    tagline: "Build Strength & Mass",
    price: "$129",
    duration: "/month",
    description:
      "For intermediate to advanced learners wanting structured muscle growth.",
    features: [
      "Advanced workout plans",
      "6 weekly workouts",
      "Supplement guidance",
      "Priority support",
      "Video form checks",
      "Monthly assessments",
    ],
    icon: Dumbbell,
    color: "from-orange-500 to-red-600",
    bgSoft: "bg-orange-50",
    bgIcon: "bg-orange-100",
    iconColor: "text-orange-600",
    border: "border-orange-200 hover:border-orange-400",
    stats: [
      { label: "Avg. Muscle Gain", value: "8–12 lbs", icon: TrendingUp },
      { label: "Program Length", value: "16 weeks", icon: Clock },
    ],
    popular: true,
  },
  {
    id: "athletic-performance",
    name: "Athletic Performance",
    tagline: "Reach Peak Performance",
    price: "$199",
    duration: "/month",
    description:
      "Elite coaching focused on speed, power, conditioning & mobility.",
    features: [
      "Sport-specific training",
      "Unlimited workouts",
      "1-on-1 video calls",
      "24/7 trainer access",
      "Recovery protocols",
      "Competition prep",
      "Mobility work",
    ],
    icon: Trophy,
    color: "from-purple-500 to-indigo-600",
    bgSoft: "bg-purple-50",
    bgIcon: "bg-purple-100",
    iconColor: "text-purple-600",
    border: "border-purple-200 hover:border-purple-400",
    stats: [
      { label: "Performance Boost", value: "30–40%", icon: Zap },
      { label: "Program Length", value: "24 weeks", icon: Clock },
    ],
    popular: false,
  },
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-purple-50" />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-orange-300 rounded-full blur-[140px] opacity-30 animate-pulse" />
      <div
        className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-purple-300 rounded-full blur-[140px] opacity-30 animate-pulse"
        style={{ animationDelay: "0.8s" }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-100 to-purple-100 rounded-full shadow-sm mb-5">
            <Zap className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-gray-800">
              Premium Fitness Coaching
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-purple-700 bg-clip-text text-transparent mb-6">
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
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-600 shadow-md animate-pulse">
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
              <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-1">{num}</p>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
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
