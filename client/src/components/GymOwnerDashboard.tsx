import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign,
  Calendar,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Dumbbell,
  Activity,
  Clock,
  Award,
  Target,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  clients: number;
  rating: number;
  status: "active" | "inactive";
  sessionsThisMonth: number;
  revenue: number;
}

interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  membershipType: string;
  joinDate: string;
  status: "active" | "expired" | "pending";
  lastVisit: string;
  totalVisits: number;
  monthlySpend: number;
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

const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialty: "Weight Loss Coach",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    clients: 24,
    rating: 5.0,
    status: "active",
    sessionsThisMonth: 96,
    revenue: 4800
  },
  {
    id: "2",
    name: "Mike Rodriguez",
    specialty: "Strength Training",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    clients: 18,
    rating: 4.9,
    status: "active",
    sessionsThisMonth: 72,
    revenue: 3600
  },
  {
    id: "3",
    name: "Emily Chen",
    specialty: "Yoga & Flexibility",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    clients: 32,
    rating: 5.0,
    status: "active",
    sessionsThisMonth: 128,
    revenue: 6400
  },
  {
    id: "4",
    name: "David Thompson",
    specialty: "HIIT Training",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    clients: 15,
    rating: 4.8,
    status: "active",
    sessionsThisMonth: 60,
    revenue: 3000
  }
];

const mockMembers: Member[] = [
  {
    id: "1",
    name: "Alex Martinez",
    email: "alex.m@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    membershipType: "Premium",
    joinDate: "2024-01-15",
    status: "active",
    lastVisit: "2 hours ago",
    totalVisits: 89,
    monthlySpend: 199
  },
  {
    id: "2",
    name: "Jessica Lee",
    email: "jessica.l@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    membershipType: "Standard",
    joinDate: "2024-03-20",
    status: "active",
    lastVisit: "1 day ago",
    totalVisits: 56,
    monthlySpend: 99
  },
  {
    id: "3",
    name: "Robert Kim",
    email: "robert.k@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    membershipType: "Premium",
    joinDate: "2023-11-05",
    status: "active",
    lastVisit: "Today",
    totalVisits: 142,
    monthlySpend: 199
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "maria.g@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    membershipType: "Basic",
    joinDate: "2024-10-10",
    status: "expired",
    lastVisit: "2 weeks ago",
    totalVisits: 12,
    monthlySpend: 49
  }
];

const mockStats: GymStats = {
  totalMembers: 287,
  activeMembers: 245,
  totalTrainers: 8,
  activeTrainers: 8,
  monthlyRevenue: 45680,
  revenueGrowth: 12.5,
  avgAttendance: 78,
  attendanceGrowth: 8.3,
  popularPrograms: [
    { name: "HIIT Training", participants: 87, growth: 15 },
    { name: "Yoga Classes", participants: 72, growth: 22 },
    { name: "Strength Training", participants: 68, growth: 10 },
    { name: "Cardio Bootcamp", participants: 54, growth: -5 }
  ],
  equipmentStatus: {
    total: 150,
    working: 142,
    maintenance: 6,
    broken: 2
  }
};

export function GymOwnerDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"trainers" | "members">("trainers");

  const filteredTrainers = mockTrainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.membershipType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700 border-green-200";
      case "expired": return "bg-red-100 text-red-700 border-red-200";
      case "pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
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
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-orange-600" />
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+{mockStats.attendanceGrowth}%</span>
                </div>
              </div>
              <div className="text-3xl text-gray-900 mb-1">{mockStats.totalMembers}</div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-xs text-gray-500 mt-1">{mockStats.activeMembers} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Dumbbell className="h-8 w-8 text-orange-600" />
                <Badge variant="outline" className="text-xs">All Active</Badge>
              </div>
              <div className="text-3xl text-gray-900 mb-1">{mockStats.totalTrainers}</div>
              <p className="text-sm text-gray-600">Trainers</p>
              <p className="text-xs text-gray-500 mt-1">{mockStats.activeTrainers} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+{mockStats.revenueGrowth}%</span>
                </div>
              </div>
              <div className="text-3xl text-gray-900 mb-1">${(mockStats.monthlyRevenue / 1000).toFixed(1)}k</div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 text-purple-600" />
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+{mockStats.attendanceGrowth}%</span>
                </div>
              </div>
              <div className="text-3xl text-gray-900 mb-1">{mockStats.avgAttendance}%</div>
              <p className="text-sm text-gray-600">Avg Attendance</p>
              <p className="text-xs text-gray-500 mt-1">Daily average</p>
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
                        key={trainer.id}
                        className="p-4 border-b hover:bg-orange-50 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={trainer.avatar}
                            alt={trainer.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm text-gray-900 truncate">{trainer.name}</h4>
                              <Badge className={getStatusColor(trainer.status)}>
                                {trainer.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{trainer.specialty}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3 text-orange-600" />
                                <span>{trainer.clients} clients</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-orange-600 fill-orange-600" />
                                <span>{trainer.rating}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-orange-600" />
                                <span>{trainer.sessionsThisMonth} sessions</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-orange-600" />
                                <span>${trainer.revenue}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Members List
                    filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        className="p-4 border-b hover:bg-orange-50 transition-all cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm text-gray-900 truncate">{member.name}</h4>
                              <Badge className={getStatusColor(member.status)}>
                                {member.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">{member.membershipType}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-orange-600" />
                                <span>{member.lastVisit}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Activity className="h-3 w-3 text-orange-600" />
                                <span>{member.totalVisits} visits</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-orange-600" />
                                <span>{new Date(member.joinDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-orange-600" />
                                <span>${member.monthlySpend}/mo</span>
                              </div>
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
            {/* Popular Programs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Popular Programs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStats.popularPrograms.map((program, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm text-orange-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">{program.name}</p>
                            <p className="text-xs text-gray-500">{program.participants} participants</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 text-sm ${
                          program.growth >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {program.growth >= 0 ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                          <span>{Math.abs(program.growth)}%</span>
                        </div>
                      </div>
                      <Progress 
                        value={(program.participants / mockStats.totalMembers) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trainer Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-600" />
                  Trainer Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTrainers.map((trainer) => (
                    <div key={trainer.id} className="flex items-center gap-4">
                      <img
                        src={trainer.avatar}
                        alt={trainer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <p className="text-sm text-gray-900">{trainer.name}</p>
                            <p className="text-xs text-gray-500">{trainer.clients} clients</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm text-gray-900">
                              <Star className="h-3 w-3 text-orange-600 fill-orange-600" />
                              {trainer.rating}
                            </div>
                            <p className="text-xs text-gray-500">${trainer.revenue}</p>
                          </div>
                        </div>
                        <Progress value={(trainer.sessionsThisMonth / 128) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Equipment Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dumbbell className="h-5 w-5 text-orange-600" />
                  Equipment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl text-gray-900 mb-1">{mockStats.equipmentStatus.total}</div>
                    <p className="text-xs text-gray-600">Total Equipment</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                    <div className="flex items-center justify-center gap-1 text-2xl text-green-700 mb-1">
                      <CheckCircle className="h-5 w-5" />
                      {mockStats.equipmentStatus.working}
                    </div>
                    <p className="text-xs text-green-700">Working</p>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-200">
                    <div className="flex items-center justify-center gap-1 text-2xl text-yellow-700 mb-1">
                      <Clock className="h-5 w-5" />
                      {mockStats.equipmentStatus.maintenance}
                    </div>
                    <p className="text-xs text-yellow-700">Maintenance</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
                    <div className="flex items-center justify-center gap-1 text-2xl text-red-700 mb-1">
                      <AlertCircle className="h-5 w-5" />
                      {mockStats.equipmentStatus.broken}
                    </div>
                    <p className="text-xs text-red-700">Broken</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Equipment Health</span>
                    <span className="text-gray-900">
                      {Math.round((mockStats.equipmentStatus.working / mockStats.equipmentStatus.total) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(mockStats.equipmentStatus.working / mockStats.equipmentStatus.total) * 100} 
                    className="h-2"
                  />
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
