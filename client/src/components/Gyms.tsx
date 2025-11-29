import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, MapPin, Users, ArrowRight } from "lucide-react";
import { gymsData } from "../data/gyms";
import { Link } from "react-router-dom";

interface GymsProps {
  onGymClick?: (gymId: string) => void; // Keeping for backward compatibility
  onViewAll?: () => void;
}

export function Gyms({ onGymClick, onViewAll }: GymsProps) {
  // Show only the first 3 gyms for the home page section
  const featuredGyms = gymsData.slice(0, 3);

  return (
    <section id="gyms" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-gray-900 mb-4">
            Our Premium Locations
          </h2>
          <p className="text-gray-600">
            Train at world-class facilities equipped with state-of-the-art equipment,
            expert trainers, and vibrant fitness communities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          {featuredGyms.map((gym) => (
            <Link key={gym.id} to={`/gyms/${gym.id}`}>
              <Card
                className="border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
              >
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={gym.image}
                    alt={gym.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-gray-900">{gym.name}</h3>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-orange-600 text-orange-600" />
                      {gym.rating}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 text-orange-600" />
                    <span>{gym.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {gym.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-orange-600" />
                      <span>{gym.totalMembers} Members</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/gyms">
            <Button
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
            >
              View All Locations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

