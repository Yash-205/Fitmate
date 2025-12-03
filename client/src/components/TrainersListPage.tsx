import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star, Award, Users, ArrowRight, Zap, TrendingUp, CheckCircle, Calendar } from "lucide-react";
import api from "../services/api";

interface Trainer {
  _id: string;
  name: string;
  avatar?: string;
  specializations?: string[];
  certifications?: string[];
  yearsOfExperience?: number;
  bio?: string;
}

export function TrainersListPage() {
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await api.get('/trainers');
        setTrainers(response.data as Trainer[]);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  if (loading) {
    return <div className="min-h-screen pt-24 flex justify-center items-center">Loading trainers...</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-purple-100 rounded-full mb-6">
            <Award className="h-4 w-4 text-orange-600" />
            <span className="text-sm text-gray-700">Expert Certified Trainers</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-purple-700 bg-clip-text text-transparent mb-6">
            Choose Your Transformation Journey
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Our certified trainers bring years of experience and proven results.
            They're here to guide, motivate, and transform your fitness journey.
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Award className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-700">All Certified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-700">Proven Track Record</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Users className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-700">{trainers.length} Expert Trainers</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <Calendar className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-700">Flexible Scheduling</span>
            </div>
          </div>
        </div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {trainers.map((trainer) => {
            return (
              <Card
                key={trainer._id}
                className="transition-all duration-300 cursor-pointer group overflow-hidden hover:shadow-xl hover:-translate-y-1 border-gray-200 hover:border-orange-200"
                onClick={() => navigate(`/trainers/${trainer._id}`)}
              >
                {/* Image with Overlay */}
                <div className="aspect-square overflow-hidden relative">
                  <ImageWithFallback
                    src={trainer.avatar || 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400'}
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <p className="text-sm mb-2">Click to view full profile</p>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        <span className="text-xs">See specializations & success stories</span>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Name and Specialty */}
                  <h3 className="text-gray-900 mb-2">{trainer.name}</h3>
                  {trainer.specializations && trainer.specializations.length > 0 && (
                    <Badge variant="secondary" className="mb-4">
                      {trainer.specializations[0]}
                    </Badge>
                  )}

                  {/* Stats Grid */}
                  <div className="space-y-3 mb-5">
                    {trainer.yearsOfExperience && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <Award className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <span className="text-sm block">{trainer.yearsOfExperience} years</span>
                          <span className="text-xs text-gray-500">Experience</span>
                        </div>
                      </div>
                    )}
                    {trainer.certifications && trainer.certifications.length > 0 && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <span className="text-sm block">{trainer.certifications.length} Certifications</span>
                          <span className="text-xs text-gray-500">Verified</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Specializations Preview */}
                  {trainer.specializations && trainer.specializations.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs text-gray-500 mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {trainer.specializations.slice(0, 3).map((spec, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-orange-50 border border-orange-200 rounded-full text-xs text-orange-700"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/trainers/${trainer._id}`);
                    }}
                  >
                    View Full Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Choose Our Trainers Section */}
        <div className="mt-20 mb-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-gray-900 mb-4">
              Why Choose Our Trainers?
            </h3>
            <p className="text-gray-600">
              Every trainer is hand-selected for their expertise, passion, and proven track record
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-gray-900 mb-2">Fully Certified</h4>
              <p className="text-gray-600 text-sm">
                All trainers hold nationally recognized certifications and maintain continuing education
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-gray-900 mb-2">Results-Driven</h4>
              <p className="text-gray-600 text-sm">
                Track record of helping hundreds of clients achieve and exceed their fitness goals
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-gray-900 mb-2">Personalized Approach</h4>
              <p className="text-gray-600 text-sm">
                Custom programs tailored to your unique goals, lifestyle, and fitness level
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-600 to-purple-600 rounded-2xl p-12 text-center max-w-4xl mx-auto shadow-2xl text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
            <Zap className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-white mb-4">
            Ready to Start Your Transformation?
          </h2>

          <p className="text-orange-50 mb-8 max-w-2xl mx-auto leading-relaxed">
            Book a free consultation with any of our expert trainers. We'll assess your goals,
            discuss your fitness journey, and create a personalized plan just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg">
              <Award className="h-5 w-5 mr-2" />
              Book Free Consultation
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              <Calendar className="h-5 w-5 mr-2" />
              View Availability
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-sm text-orange-100 mb-3">✨ <strong>Free Consultation Includes:</strong></p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-orange-50">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Goal Assessment
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Fitness Evaluation
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Custom Plan Preview
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                No Obligation
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="text-4xl bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">820+</div>
            <div className="text-sm text-gray-600">Clients Trained</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="text-4xl bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">26+</div>
            <div className="text-sm text-gray-600">Years Combined</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="text-4xl bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">4.9</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <div className="text-4xl bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">100%</div>
            <div className="text-sm text-gray-600">Certified Pros</div>
          </div>
        </div>
      </div>
    </div>
  );
}
