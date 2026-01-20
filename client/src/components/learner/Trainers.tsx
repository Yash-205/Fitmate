import { ImageWithFallback } from "../common/figma/ImageWithFallback";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";
import { trainersData } from "../../data/trainers";
import { Link } from "react-router-dom";

interface TrainersProps {
  onTrainerClick?: (trainerId: string) => void; // Keeping for backward compatibility
}

export function Trainers({ onTrainerClick }: TrainersProps) {
  return (
    <section id="trainers" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-gray-900 mb-4">
            Meet Your Expert Trainers
          </h2>
          <p className="text-gray-600">
            Our certified trainers bring years of experience and proven results.
            They're here to guide, motivate, and transform your fitness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {trainersData.map((trainer) => (
            <Link key={trainer.id} to={`/trainers/${trainer.id}`}>
              <Card
                className="border-gray-200 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full"
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-gray-900 mb-1">{trainer.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {trainer.specialty}
                  </Badge>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                      <span>{trainer.rating} Rating</span>
                    </div>
                    <div>{trainer.experience} Experience</div>
                    <div>{trainer.clients}+ Happy Clients</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

