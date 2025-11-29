import { useEffect, useState } from "react";
import { trainersData } from "../data/trainers";
import { gymsData } from "../data/gyms";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, Award, Users, Calendar, MapPin, ArrowLeft, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Link, useParams } from "react-router-dom";

interface TrainerProfileProps {
  trainerId?: string; // Optional now as we can get it from params
  onBack?: () => void; // Optional for backward compatibility
}

export function TrainerProfile({ trainerId: propTrainerId, onBack }: TrainerProfileProps) {
  const { id } = useParams<{ id: string }>();
  const trainerId = propTrainerId || id;
  const [trainer, setTrainer] = useState(trainersData.find(t => t.id === trainerId));

  useEffect(() => {
    window.scrollTo(0, 0);
    setTrainer(trainersData.find(t => t.id === trainerId));
  }, [trainerId]);

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

  const trainerGyms = gymsData.filter(gym => gym.trainerIds.includes(trainerId || ""));

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
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-3">
                {trainer.specialty}
              </Badge>
              <h1 className="text-gray-900 mb-4">{trainer.name}</h1>
              <p className="text-gray-600 mb-6">{trainer.bio}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                  <div>
                    <p className="text-gray-900">{trainer.rating}</p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-gray-900">{trainer.clients}+</p>
                    <p className="text-xs text-gray-500">Clients Trained</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-gray-900">{trainer.experience}</p>
                    <p className="text-xs text-gray-500">Experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-gray-900">{trainerGyms.length}</p>
                    <p className="text-xs text-gray-500">Locations</p>
                  </div>
                </div>
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
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="expertise">Expertise</TabsTrigger>
            <TabsTrigger value="success">Success Stories</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>

          {/* Expertise Tab */}
          <TabsContent value="expertise">
            <div className="grid md:grid-cols-2 gap-6">
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

              <Card>
                <CardHeader>
                  <CardTitle>Core Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {trainer.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
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
            </div>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="success">
            <div className="grid md:grid-cols-3 gap-6">
              {trainer.successStories.map((story, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.clientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-gray-900 mb-2">{story.clientName}</h3>
                    <p className="text-gray-600 mb-3">{story.achievement}</p>
                    <Badge variant="secondary">
                      {story.timeframe}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {trainer.availability.map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 border rounded-lg hover:border-orange-600 transition-colors"
                    >
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <span className="text-gray-700">{slot}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Note:</strong> Schedule subject to change. Book a session to confirm availability and discuss your fitness goals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations">
            <div className="grid md:grid-cols-2 gap-6">
              {trainerGyms.map((gym) => (
                <Link key={gym.id} to={`/gyms/${gym.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
                    <div className="aspect-video overflow-hidden">
                      <ImageWithFallback
                        src={gym.image}
                        alt={gym.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-gray-900 mb-2">{gym.name}</h3>
                      <div className="flex items-start gap-2 text-gray-600 mb-4">
                        <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                        <span>{gym.location}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{gym.description}</p>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                        <span className="text-sm text-gray-700">{gym.rating} Rating</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

