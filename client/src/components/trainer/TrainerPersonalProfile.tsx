import {
  User,
  MapPin,
  Clock,
  Star,
  Award,
  TrendingUp,
  Shield,
  CheckCircle,
  Briefcase,
  Users,
  MessageSquare,
  DollarSign,
  Calendar,
  Settings,
  Edit,
  Camera,
  LogOut,
  ChevronRight,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";
import { useAuth } from "../../contexts/AuthContext";

interface TrainerPersonalProfilePageProps {
  onBack?: () => void;
}

export function TrainerPersonalProfilePage({ onBack }: TrainerPersonalProfilePageProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const trainerData = {
    name: user?.name || "Trainer",
    photo: user?.avatar || "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb25hbCUyMHRyYWluZXIlMjBtYW58ZW58MXx8fHwxNzY3NDM3NTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    coverPhoto: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW0lMjB0cmFpbmVyJTIwYWN0aW9ufGVufDF8fHx8MTc2NzQzNzY1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    certifications: user?.certifications || ["NASM CPT", "Nutrition Coach"],
    experience: user?.yearsOfExperience ? `${user.yearsOfExperience} Years Exp.` : "Experience not set",
    specializations: user?.specializations || ["Strength Training", "HIIT", "Weight Loss"],
    rating: user?.rating || 4.9,
    reviews: user?.reviews ? user.reviews.length : 124,
    languages: ["English", "Spanish"], // Mock

    // Work Status
    availability: user?.availability || "Mon-Fri, 6am-8pm",
    onlineHours: "Flexible", // Mock
    responseSLA: "< 2 hours", // Mock

    // Stats
    activeClients: 18, // Mock
    successStories: 45, // Mock
    programsCreated: 8, // Mock

    // Gyms
    linkedGyms: [
      { name: "PowerFit Gym", location: "Downtown", status: "Active" },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Cover Photo */}
      <section className="relative bg-gradient-to-br from-blue-600 to-cyan-600 text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src={trainerData.coverPhoto}
            alt="Trainer Cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-cyan-600/90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-white mb-2">Trainer Profile</h1>
                <p className="text-blue-100">Professional portfolio and client management</p>
              </div>
              {onBack && (
                <Button
                  variant="outline"
                  onClick={onBack}
                  className="bg-transparent border-none text-white hover:bg-white hover:text-blue-600"
                >
                  Back
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Overlapping Cards */}
      <section className="-mt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* Identity Card */}
            <Card className="border-gray-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
              <CardContent className="p-8 relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  {/* Photo */}
                  <div className="relative flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                      <ImageWithFallback
                        src={trainerData.photo}
                        alt={trainerData.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg transform hover:scale-110">
                      <Camera className="h-5 w-5" />
                    </button>
                    <div className="absolute -top-2 -left-2">
                      <Badge className="bg-cyan-500 text-white border-0 shadow-md">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-3xl text-gray-900 mb-2">{trainerData.name}</h2>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {trainerData.certifications.map((cert, i) => (
                            <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100">
                              <Award className="h-3 w-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            {trainerData.rating} ({trainerData.reviews} reviews)
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4 text-gray-400" />
                            {trainerData.experience}
                          </span>
                        </div>
                      </div>
                      <Button
                        onClick={() => setIsEditing(!isEditing)}
                        className={isEditing
                          ? "bg-green-600 hover:bg-green-700 shadow-md"
                          : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md"
                        }
                      >
                        {isEditing ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Save
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialization & Skills */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100 bg-gray-50">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Specializations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {trainerData.specializations.map((spec, i) => (
                      <div key={i} className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        {spec}
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 mb-3 block flex items-center gap-2">
                      <Globe className="h-4 w-4 text-cyan-600" />
                      Languages
                    </label>
                    <div className="flex gap-2">
                      {trainerData.languages.map((lang, i) => (
                        <Badge key={i} variant="outline" className="border-gray-300 text-gray-700">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Work Status */}
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100 bg-gray-50">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-cyan-600" />
                    Work Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <span className="text-xs text-gray-500 uppercase">Availability</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{trainerData.availability}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase">Response Time</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{trainerData.responseSLA}</p>
                  </div>
                  <div className="pt-2">
                    <Badge className="bg-green-100 text-green-700 border-0 w-full justify-center">
                      Open for New Clients
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Client Engagement Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">{trainerData.activeClients}</p>
                <p className="text-xs text-gray-500">Active Clients</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                <p className="text-3xl font-bold text-cyan-600 mb-1">{trainerData.successStories}</p>
                <p className="text-xs text-gray-500">Success Stories</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                <p className="text-3xl font-bold text-purple-600 mb-1">{trainerData.programsCreated}</p>
                <p className="text-xs text-gray-500">Programs Created</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-center">
                <p className="text-3xl font-bold text-orange-600 mb-1">{trainerData.rating}</p>
                <p className="text-xs text-gray-500">Avg Rating</p>
              </div>
            </div>

            {/* Linked Gyms & Account */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-600" />
                      Linked Gyms
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-blue-600">Request Link</Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {trainerData.linkedGyms.map((gym, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {gym.name[0]}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{gym.name}</p>
                            <p className="text-xs text-gray-500">{gym.location}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-0">
                          {gym.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100 bg-gray-50">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-3">
                    <Button variant="outline" className="justify-start border-gray-300 hover:bg-gray-50">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Rates & Payments
                    </Button>
                    <Button variant="outline" className="justify-start border-gray-300 hover:bg-gray-50">
                      <Calendar className="h-4 w-4 mr-2" />
                      Sync Calendar
                    </Button>
                    <Button variant="outline" className="justify-start border-gray-300 hover:bg-gray-50">
                      <Shield className="h-4 w-4 mr-2" />
                      Verification Status
                    </Button>
                    <Button variant="outline" className="justify-start border-red-300 text-red-600 hover:bg-red-50">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
