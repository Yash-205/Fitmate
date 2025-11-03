import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Check } from "lucide-react";

const programs = [
  {
    id: "weight-loss",
    name: "Weight Loss",
    price: "$79",
    duration: "/month",
    description: "Perfect for those looking to shed pounds and build healthy habits.",
    features: [
      "Custom meal plans",
      "4 weekly workouts",
      "Progress tracking",
      "Email support",
      "Nutrition guides",
    ],
    popular: false,
  },
  {
    id: "muscle-building",
    name: "Muscle Building",
    price: "$129",
    duration: "/month",
    description: "Intensive program designed to build lean muscle and strength.",
    features: [
      "Advanced training plans",
      "6 weekly workouts",
      "Supplement guidance",
      "Priority support",
      "Video form checks",
      "Monthly assessments",
    ],
    popular: true,
  },
  {
    id: "athletic-performance",
    name: "Athletic Performance",
    price: "$199",
    duration: "/month",
    description: "Elite program for athletes and serious fitness enthusiasts.",
    features: [
      "Sport-specific training",
      "Unlimited workouts",
      "1-on-1 video calls",
      "24/7 trainer access",
      "Recovery protocols",
      "Competition prep",
      "Mobility work",
    ],
    popular: false,
  },
];

export function Programs() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  const handleSelectProgram = (programId: string) => {
    setSelectedProgram(programId);
    // You can add additional logic here, like opening a modal or scrolling to a form
  };
  return (
    <section id="programs" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-gray-900 mb-4">
            Choose Your Program
          </h2>
          <p className="text-gray-600 mb-2">
            Select the perfect coaching program tailored to your fitness goals. 
            All plans include personalized guidance and ongoing support.
          </p>
          <p className="text-sm text-orange-600">
            Click any program to select it
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {programs.map((program) => {
            const isSelected = selectedProgram === program.id;
            const isPopular = program.popular;
            
            return (
              <Card 
                key={program.id} 
                className={`relative transition-all duration-300 cursor-pointer hover:shadow-xl ${
                  isSelected 
                    ? 'border-orange-600 shadow-xl scale-105 bg-orange-50/50' 
                    : isPopular 
                    ? 'border-orange-400 shadow-lg md:scale-105' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => handleSelectProgram(program.id)}
              >
                {isPopular && !isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-orange-600">Most Popular</Badge>
                  </div>
                )}
                {isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-600">Selected</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="mb-2">{program.name}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-gray-900">{program.price}</span>
                    <span className="text-gray-600">{program.duration}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        <Check className={`h-3 w-3 ${
                          isSelected ? 'text-green-600' : 'text-orange-600'
                        }`} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full transition-all ${
                      isSelected 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : isPopular 
                        ? 'bg-orange-600 hover:bg-orange-700' 
                        : ''
                    }`}
                    variant={isSelected || isPopular ? 'default' : 'outline'}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectProgram(program.id);
                    }}
                  >
                    {isSelected ? 'Selected' : 'Select Program'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
