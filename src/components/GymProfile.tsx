import { useEffect } from "react";
import { gymsData } from "../data/gyms";
import { trainersData } from "../data/trainers";
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

interface GymProfileProps {
  gymId: string;
  onBack: () => void;
  onTrainerClick: (trainerId: string) => void;
}

export function GymProfile({
  gymId,
  onBack,
  onTrainerClick,
}: GymProfileProps) {
  const gym = gymsData.find((g) => g.id === gymId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gymId]);

  if (!gym) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-gray-900 mb-4">Gym Not Found</h2>
          <Button
            onClick={onBack}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gyms
          </Button>
        </div>
      </div>
    );
  }

  const gymTrainers = trainersData.filter((trainer) =>
    gym.trainerIds.includes(trainer.id),
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gyms
        </Button>

        {/* Hero Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="aspect-video md:aspect-[21/9] overflow-hidden">
            <ImageWithFallback
              src={gym.image}
              alt={gym.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h1 className="text-gray-900 mb-2">
                  {gym.name}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-600" />
                    <span>{gym.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-orange-600 fill-orange-600" />
                    <span>{gym.rating} Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    <span>{gym.totalMembers} Members</span>
                  </div>
                </div>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Join Now
              </Button>
            </div>
            <p className="text-gray-600 text-lg">
              {gym.description}
            </p>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="amenities">
              Amenities
            </TabsTrigger>
            <TabsTrigger value="trainers">Trainers</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hours of Operation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-900">
                          Weekdays
                        </p>
                        <p className="text-gray-600">
                          {gym.hours.weekdays}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-900">
                          Weekends
                        </p>
                        <p className="text-gray-600">
                          {gym.hours.weekends}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-900">Phone</p>
                        <p className="text-gray-600">
                          {gym.contact.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-900">Email</p>
                        <p className="text-gray-600">
                          {gym.contact.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-900">Address</p>
                        <p className="text-gray-600">
                          {gym.contact.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {gym.features.map((feature, index) => (
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
            </div>
          </TabsContent>

          {/* Amenities Tab */}
          <TabsContent value="amenities">
            <Card>
              <CardHeader>
                <CardTitle>Facility Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {gym.amenities.map((amenity, index) => (
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trainers Tab */}
          <TabsContent value="trainers">
            <div className="grid md:grid-cols-3 gap-6">
              {gymTrainers.map((trainer) => (
                <Card
                  key={trainer.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => onTrainerClick(trainer.id)}
                >
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-gray-900 mb-2">
                      {trainer.name}
                    </h3>
                    <Badge variant="secondary" className="mb-3">
                      {trainer.specialty}
                    </Badge>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-orange-600 fill-orange-600" />
                        <span>{trainer.rating} Rating</span>
                      </div>
                      <div>{trainer.experience} Experience</div>
                      <div>{trainer.clients}+ Clients</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <div className="grid md:grid-cols-3 gap-6">
              {gym.membershipOptions.map((option, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden ${
                    index === 1
                      ? "border-2 border-orange-600 shadow-xl"
                      : ""
                  }`}
                >
                  {index === 1 && (
                    <div className="bg-orange-600 text-white text-center py-2 text-sm">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-center">
                      {option.name}
                    </CardTitle>
                    <div className="text-center">
                      <span className="text-gray-900 text-3xl">
                        {option.price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {option.features.map(
                        (feature, fIndex) => (
                          <li
                            key={fIndex}
                            className="flex items-start gap-2"
                          >
                            <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">
                              {feature}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                    <Button
                      className={`w-full ${
                        index === 1
                          ? "bg-orange-600 hover:bg-orange-700"
                          : "bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      Select Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="grid md:grid-cols-2 gap-6">
              {gym.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video overflow-hidden rounded-lg shadow-lg"
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${gym.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}