import { gymsData } from "../data/gyms";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, MapPin, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface GymsPageProps {
  onGymClick?: (gymId: string) => void; // Optional for backward compatibility
}

export function GymsPage({ onGymClick }: GymsPageProps) {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-gray-900 mb-4">
            Our Premium Gym Locations
          </h1>
          <p className="text-gray-600 text-lg">
            Train at world-class facilities with top-tier equipment, expert trainers, and vibrant fitness communities. Each location is designed to help you achieve your fitness goals.
          </p>
        </div>

        {/* Gyms Grid */}
        <div className="grid gap-8 max-w-6xl mx-auto">
          {gymsData.map((gym) => (
            <Card
              key={gym.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-gray-200"
            >
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 aspect-video md:aspect-auto overflow-hidden">
                  <ImageWithFallback
                    src={gym.image}
                    alt={gym.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="md:col-span-3 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-gray-900 mb-2">{gym.name}</h2>
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <MapPin className="h-4 w-4 text-orange-600" />
                          <span>{gym.location}</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-orange-600 text-orange-600" />
                        {gym.rating}
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {gym.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {gym.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {gym.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{gym.features.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-orange-600" />
                        <span>{gym.totalMembers} Members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-orange-600" />
                        <span>{gym.trainerIds.length} Expert Trainers</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link to={`/gyms/${gym.id}`} className="flex-1">
                      <Button
                        className="bg-orange-600 hover:bg-orange-700 w-full"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline">
                      Join Now
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-12 text-center text-white">
          <h2 className="text-white mb-4">
            Not sure which location is right for you?
          </h2>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Schedule a free tour at any of our locations. Our team will show you around, introduce you to our trainers, and help you find the perfect fit for your fitness journey.
          </p>
          <Button className="bg-white text-orange-600 hover:bg-gray-100">
            Schedule a Tour
          </Button>
        </div>
      </div>
    </div>
  );
}

