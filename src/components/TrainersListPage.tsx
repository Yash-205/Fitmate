import { trainersData } from "../data/trainers";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, Award, Users, ArrowRight } from "lucide-react";

interface TrainersListPageProps {
  onTrainerClick: (trainerId: string) => void;
}

export function TrainersListPage({ onTrainerClick }: TrainersListPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-gray-900 mb-4">
            Meet Our Expert Trainers
          </h1>
          <p className="text-gray-600 text-lg">
            Our certified trainers bring years of experience and proven results. 
            They're here to guide, motivate, and transform your fitness journey.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trainersData.map((trainer) => (
            <Card 
              key={trainer.id} 
              className="border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => onTrainerClick(trainer.id)}
            >
              <div className="aspect-square overflow-hidden">
                <ImageWithFallback
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-gray-900 mb-1">{trainer.name}</h3>
                <Badge variant="secondary" className="mb-4">
                  {trainer.specialty}
                </Badge>
                <div className="space-y-2 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                    <span>{trainer.rating} Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-orange-600" />
                    <span>{trainer.experience} Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-600" />
                    <span>{trainer.clients}+ Clients</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTrainerClick(trainer.id);
                  }}
                >
                  View Profile
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-12 text-center text-white max-w-4xl mx-auto">
          <h2 className="text-white mb-4">
            Ready to Start Your Transformation?
          </h2>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Book a free consultation with any of our expert trainers. We'll assess your goals, 
            discuss your fitness journey, and create a personalized plan just for you.
          </p>
          <Button className="bg-white text-orange-600 hover:bg-gray-100">
            Book Free Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
