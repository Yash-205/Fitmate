import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, Award, Users, Calendar, MapPin, ArrowLeft, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

interface TrainerProfileProps {
  trainerId?: string;
  onBack?: () => void;
}

interface Trainer {
  _id: string;
  name: string;
  avatar?: string;
  specializations?: string[];
  certifications?: string[];
  yearsOfExperience?: number;
  bio?: string;
  gymId?: {
    _id: string;
    gymName: string;
    gymLocation: string;
    avatar?: string;
  };
  clients?: any[];
  clientCount?: number;
}

export function TrainerProfile({ trainerId: propTrainerId, onBack }: TrainerProfileProps) {
  const { id } = useParams<{ id: string }>();
  const trainerId = propTrainerId || id;
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainer = async () => {
      if (!trainerId) return;

      try {
        const response = await api.get(`/trainers/${trainerId}`);
        setTrainer(response.data as Trainer);
      } catch (error) {
        console.error('Error fetching trainer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainer();
    window.scrollTo(0, 0);
  }, [trainerId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
        Loading trainer details...
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-gray-900 mb-4">Trainer Not Found</h2>
          <Link to="/trainers">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Trainers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/trainers">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Trainers
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square md:aspect-auto overflow-hidden">
              <ImageWithFallback
                src={trainer.avatar || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'}
                alt={trainer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              {trainer.specializations && trainer.specializations.length > 0 && (
                <Badge variant="secondary" className="w-fit mb-3">
                  {trainer.specializations[0]}
                </Badge>
              )}
              <h1 className="text-gray-900 mb-4">{trainer.name}</h1>
              <p className="text-gray-600 mb-6">
                {trainer.bio || 'Certified fitness professional dedicated to helping you achieve your goals.'}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {trainer.yearsOfExperience && (
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-gray-900">{trainer.yearsOfExperience} years</p>
                      <p className="text-xs text-gray-500">Experience</p>
                    </div>
                  </div>
                )}
                {trainer.clientCount !== undefined && (
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-gray-900">{trainer.clientCount}+</p>
                      <p className="text-xs text-gray-500">Clients Trained</p>
                    </div>
                  </div>
                )}
                {trainer.certifications && trainer.certifications.length > 0 && (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-gray-900">{trainer.certifications.length}</p>
                      <p className="text-xs text-gray-500">Certifications</p>
                    </div>
                  </div>
                )}
                {trainer.gymId && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-gray-900">1</p>
                      <p className="text-xs text-gray-500">Location</p>
                    </div>
                  </div>
                )}
              </div>

              <Button className="bg-orange-600 hover:bg-orange-700 w-full md:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                Book a Session
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="expertise" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="expertise">Expertise</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          {/* Expertise Tab */}
          <TabsContent value="expertise">
            <div className="grid md:grid-cols-2 gap-6">
              {trainer.certifications && trainer.certifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {trainer.certifications.map((cert, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {trainer.specializations && trainer.specializations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Specializations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {trainer.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location">
            {trainer.gymId ? (
              <Link to={`/gyms/${trainer.gymId._id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="aspect-video overflow-hidden">
                    <ImageWithFallback
                      src={trainer.gymId.avatar || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800'}
                      alt={trainer.gymId.gymName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-gray-900 mb-2">{trainer.gymId.gymName}</h3>
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                      <span>{trainer.gymId.gymLocation}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  This trainer is not currently affiliated with a gym. Contact them for online training options.
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
