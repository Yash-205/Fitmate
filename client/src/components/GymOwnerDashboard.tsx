
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Users,
  Dumbbell,
  TrendingUp,
  DollarSign,
  Search,
  Plus,
  MoreVertical,
  Star,
  Activity,
  Calendar,
  Settings,
  LogOut,
  Clock,
  Building2
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Trainer {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  specializations?: string[];
  certifications?: string[];
  // Add other fields as needed
}

interface Member {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  fitnessGoals?: string[];
  profileCompleted: boolean;
  createdAt: string;
  // Add other fields as needed
}

interface GymStats {
  totalMembers: number;
  activeMembers: number;
  totalTrainers: number;
  activeTrainers: number;
  monthlyRevenue: number;
  revenueGrowth: number;
  avgAttendance: number;
  attendanceGrowth: number;
  popularPrograms: {
    name: string;
    participants: number;
    growth: number;
  }[];
  equipmentStatus: {
    total: number;
    working: number;
    maintenance: number;
    broken: number;
  };
}

export function GymOwnerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"trainers" | "members">("trainers");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        const data = response.data as { trainers: Trainer[]; members: Member[] };
        setTrainers(data.trainers || []);
        setMembers(data.members || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats: GymStats = {
    totalMembers: members.length,
    activeMembers: members.length, // Placeholder
    totalTrainers: trainers.length,
    activeTrainers: trainers.length, // Placeholder
    monthlyRevenue: 0, // Placeholder
    revenueGrowth: 0, // Placeholder
    avgAttendance: 0, // Placeholder
    attendanceGrowth: 0, // Placeholder
    popularPrograms: [], // Placeholder
    equipmentStatus: { // Placeholder
      total: 0,
      working: 0,
      maintenance: 0,
      broken: 0
    }
  };



  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-gray-900 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              Gym Owner Dashboard
            </h1>
          </div>
          <p className="text-gray-600">Manage your gym, trainers, and members</p>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Top Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Total Members</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.totalMembers}</h3>
                  <p className="text-green-600 text-sm mt-1">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +{stats.activeMembers} active
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Active Trainers</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.activeTrainers}</h3>
                  <p className="text-green-600 text-sm mt-1">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    Full capacity
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Monthly Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</h3>
                  <p className="text-green-600 text-sm mt-1">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +{stats.revenueGrowth}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Avg. Attendance</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.avgAttendance}%</h3>
                  <p className="text-green-600 text-sm mt-1">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +{stats.attendanceGrowth}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trainers/Members List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle>
                    {viewMode === "trainers" ? "Your Trainers" : "Your Members"}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={viewMode === "trainers" ? "default" : "outline"}
                      onClick={() => setViewMode("trainers")}
                      className={viewMode === "trainers" ? "bg-orange-600 hover:bg-orange-700" : ""}
                    >
                      <Dumbbell className="h-4 w-4 mr-1" />
                      Trainers
                    </Button>
                    <Button
                      size="sm"
                      variant={viewMode === "members" ? "default" : "outline"}
                      onClick={() => setViewMode("members")}
                      className={viewMode === "members" ? "bg-orange-600 hover:bg-orange-700" : ""}
                    >
                      <Users className="h-4 w-4 mr-1" />
                      Members
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={`Search ${viewMode}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {viewMode === "trainers" ? (
                    // Trainers List
                    filteredTrainers.map((trainer) => (
                      <div
                        key={trainer._id}
                        className="p-4 border-b hover:bg-orange-50 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                            {trainer.avatar ? (
                              <img src={trainer.avatar} alt={trainer.name} className="w-full h-full object-cover" />
                            ) : (
                              <Users className="w-full h-full p-3 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm text-gray-900 truncate">{trainer.name}</h4>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{trainer.email}</p>
                            {trainer.specializations && (
                              <div className="flex flex-wrap gap-1">
                                {trainer.specializations.map((spec, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs font-normal">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Members List
                    filteredMembers.map((member) => (
                      <div
                        key={member._id}
                        className="p-4 border-b hover:bg-orange-50 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                            {member.avatar ? (
                              <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <Users className="w-full h-full p-3 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm text-gray-900 truncate">{member.name}</h4>
                              {member.profileCompleted && (
                                <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{member.email}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Calendar className="h-3 w-3" />
                              <span>Joined {new Date(member.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Analytics & Insights */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 text-center text-gray-500">
                  Detailed analytics coming soon...
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-r from-orange-600 to-purple-600 text-white border-0">
              <CardContent className="p-6">
                <h3 className="text-white mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-white text-orange-600 hover:bg-orange-50">
                    <Users className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                  <Button className="bg-white text-orange-600 hover:bg-orange-50">
                    <Dumbbell className="h-4 w-4 mr-2" />
                    Add Trainer
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Schedule
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
