import { useEffect, useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowLeft,
  CheckCircle,
  Users,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

interface GymProfileProps {
  gymId?: string;
  onBack?: () => void;
  onTrainerClick?: (trainerId: string) => void;
}

interface Gym {
  _id: string;
  gymName: string;
  gymLocation: string;
  avatar?: string;
  facilities?: string[];
  bio?: string;
  phone?: string;
  email?: string;
  trainers?: any[];
  members?: any[];
  memberCount?: number;
}

export function GymProfile({
  gymId: propGymId,
  onBack,
  onTrainerClick,
}: GymProfileProps) {
  const { id } = useParams<{ id: string }>();
  const gymId = propGymId || id;
  const [gym, setGym] = useState<Gym | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGym = async () => {
      if (!gymId) return;

      try {
        const response = await api.get(`/gyms/${gymId}`);
        setGym(response.data as Gym);
      } catch (error) {
        console.error('Error fetching gym:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGym();
    window.scrollTo(0, 0);
  }, [gymId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
        Loading gym details...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex justify-center items-center">
        Loading gym details...
      </div>
    );
  }

  if (!gym) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-gray-900 mb-4">Gym Not Found</h2>
          <Link to="/gyms">
            <Button className="bg-orange-600 hover:bg-orange-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gyms
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
        <Link to="/gyms">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gyms
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="aspect-video md:aspect-[21/9] overflow-hidden">
            <ImageWithFallback
              src={gym.avatar || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800'}
              alt={gym.gymName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-gray-900 mb-2">
                  {gym.gymName}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    <span>{gym.gymLocation}</span>
                  </div>
                  {gym.memberCount !== undefined && (
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-orange-600" />
                      <span>{gym.memberCount} Members</span>
                    </div>
                  )}
                </div>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Join Now
              </Button>
            </div>
            <p className="text-gray-600 text-lg">
              {gym.bio || 'Premier fitness facility with state-of-the-art equipment and expert trainers.'}
            </p>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="trainers">Trainers</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gym.phone && (
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-900">Phone</p>
                          <p className="text-gray-600">{gym.phone}</p>
                        </div>
                      </div>
                    )}
                    {gym.email && (
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-900">Email</p>
                          <p className="text-gray-600">{gym.email}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-900">Location</p>
                        <p className="text-gray-600">{gym.gymLocation}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {gym.facilities && gym.facilities.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {gym.facilities.slice(0, 6).map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Amenities Tab */}
          <TabsContent value="amenities">
            <Card>
              <CardHeader>
                <CardTitle>Facility Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                {gym.facilities && gym.facilities.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gym.facilities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 border rounded-lg hover:border-orange-600 transition-colors"
                      >
                        <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No amenities information available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trainers Tab */}
          <TabsContent value="trainers">
            {gym.trainers && gym.trainers.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {gym.trainers.map((trainer: any) => (
                  <Link key={trainer._id} to={`/trainers/${trainer._id}`}>
                    <Card
                      className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full"
                    >
                      <div className="aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={trainer.avatar || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'}
                          alt={trainer.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-gray-900 mb-2">
                          {trainer.name}
                        </h3>
                        {trainer.specializations && trainer.specializations.length > 0 && (
                          <Badge variant="secondary" className="mb-3">
                            {trainer.specializations[0]}
                          </Badge>
                        )}
                        <div className="space-y-2 text-sm text-gray-600">
                          {trainer.yearsOfExperience && (
                            <div>{trainer.yearsOfExperience} years experience</div>
                          )}
                          {trainer.certifications && (
                            <div>{trainer.certifications.length} certifications</div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  No trainers associated with this gym yet.
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}