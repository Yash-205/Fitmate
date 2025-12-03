import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogOut, MapPin } from "lucide-react";
import { Progress } from "./ui/progress";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Users,
  TrendingUp,
  Target,
  Calendar,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  Clock,
  Dumbbell,
  Heart,
  Activity,
  Send
} from "lucide-react";

interface ClientProgress {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  fitnessGoals?: string[];
  profileCompleted: boolean;
  createdAt: string;
  // Add other fields as needed, mapping from User model
}

export function TrainerDashboard() {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClientProgress | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientProgress[]>([]);
  const [gym, setGym] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/dashboard');
        const data = response.data as { clients: ClientProgress[]; gym: any };
        setClients(data.clients || []);
        setGym(data.gym);
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

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalClients: clients.length,
    activeClients: clients.length, // Placeholder logic
    avgProgress: 0, // Placeholder logic
    needsAttention: 0 // Placeholder logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "bg-green-100 text-green-700 border-green-200";
      case "active": return "bg-blue-100 text-blue-700 border-blue-200";
      case "needs-attention": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "on-track": return "On Track";
      case "active": return "Active";
      case "needs-attention": return "Needs Attention";
      default: return "Inactive";
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-gray-900 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              Trainer Dashboard
            </h1>
          </div>
          <p className="text-gray-600">Manage and track your clients' progress</p>
          {/* 🔥 Logout Button Added */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-orange-600" />
                <Badge variant="outline" className="text-xs">Total</Badge>
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stats.totalClients}</div>
              <p className="text-sm text-gray-600">Total Clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 text-green-600" />
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stats.activeClients}</div>
              <p className="text-sm text-gray-600">Active Clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <Badge variant="outline" className="text-xs">Avg</Badge>
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stats.avgProgress}%</div>
              <p className="text-sm text-gray-600">Avg Progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-8 w-8 text-red-600" />
                {stats.needsAttention > 0 && <ArrowDownRight className="h-5 w-5 text-red-600" />}
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stats.needsAttention}</div>
              <p className="text-sm text-gray-600">Needs Attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Clients</CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredClients.map((client) => (
                    <div
                      key={client._id}
                      onClick={() => setSelectedClient(client)}
                      className={`p-4 border-b cursor-pointer transition-all hover:bg-orange-50 ${selectedClient?._id === client._id ? 'bg-orange-50 border-l-4 border-l-orange-600' : ''
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                          {client.avatar ? (
                            <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                          ) : (
                            <Users className="w-full h-full p-3 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-sm text-gray-900 truncate">{client.name}</h4>
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              Active
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mb-2">{client.email}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Client Details */}
          <div className="lg:col-span-2">
            {selectedClient ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                        {selectedClient.avatar ? (
                          <img src={selectedClient.avatar} alt={selectedClient.name} className="w-full h-full object-cover" />
                        ) : (
                          <Users className="w-full h-full p-3 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <CardTitle>{selectedClient.name}</CardTitle>
                        <p className="text-sm text-gray-500">{selectedClient.email}</p>
                        <Badge className="mt-2 bg-green-100 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Member since</p>
                      <p className="text-sm">{new Date(selectedClient.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                      <TabsTrigger value="goals">Goals</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                      <div className="p-4 text-center text-gray-500">
                        Detailed metrics coming soon...
                      </div>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-4">
                      <div className="p-4 text-center text-gray-500">
                        Activity history coming soon...
                      </div>
                    </TabsContent>

                    <TabsContent value="goals" className="space-y-4">
                      <div className="p-4 text-center text-gray-500">
                        Goals tracking coming soon...
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Session
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-16">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">Select a Client</h3>
                  <p className="text-gray-500">Choose a client from the list to view their details and progress</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
