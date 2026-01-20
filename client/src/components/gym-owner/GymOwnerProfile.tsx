import {
    Building2,
    MapPin,
    Clock,
    Edit,
    Camera,
    Check,
    Users,
    Dumbbell,
    Settings,
    DollarSign,
    LogOut,
    CheckCircle,
    Award,
    ChevronRight,
    // Calendar,
    Shield,
    Zap,
    Activity,
    // Weight,
    Star,
    TrendingUp,
    LucideIcon
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";
import { useAuth } from "../../contexts/AuthContext";

interface GymOwnerProfilePageProps {
    onBack?: () => void;
}

export function GymOwnerProfilePage({ onBack }: GymOwnerProfilePageProps) {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Map facilities to icons if possible, otherwise use default
    const getFacilityIcon = (facilityName: string): LucideIcon => {
        const lower = facilityName.toLowerCase();
        if (lower.includes("cardio")) return Activity;
        if (lower.includes("weight") || lower.includes("strength")) return Dumbbell;
        if (lower.includes("class") || lower.includes("studio")) return Users;
        if (lower.includes("pool") || lower.includes("swim")) return Activity;
        return Zap;
    };

    const gymData = {
        name: user?.gymName || user?.name || "My Gym",
        photo: user?.avatar || "https://images.unsplash.com/photo-1761971975769-97e598bf526b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBneW0lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjczMzkzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        coverPhoto: "https://images.unsplash.com/photo-1632077804406-188472f1a810?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2NzM2OTUwOXww&ixlib=rb-4.1.0&q=80&w=1080",
        address: user?.gymLocation || "Location not set",
        operatingHours: "Mon-Fri: 5 AM - 11 PM, Sat-Sun: 6 AM - 10 PM",
        verified: user?.profileCompleted || false,

        // Facilities Overview
        equipmentLevel: "Premium - Full Range",
        spaceType: "Multi-floor (15,000 sq ft)",
        specialFacilities: (user?.facilities || ["Cardio Zone", "Free Weights Area"]).map(f => ({
            name: f,
            icon: getFacilityIcon(f)
        })),

        // Associated People
        trainersOnboarded: 8, // Mock for now, could fetch from API
        activeMembers: user?.totalMembers || 0,

        // Membership Settings
        activePlans: [
            { name: "Basic Monthly", price: "$49/mo", popular: false },
            { name: "Premium Monthly", price: "$79/mo", popular: true },
            { name: "Annual Premium", price: "$799/yr", popular: false },
            { name: "Day Pass", price: "$15/day", popular: false }
        ],
        trainerAccessRules: "Partnered trainers: Full access, Independent: Member zones only"
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Cover Photo */}
            <section className="relative bg-gradient-to-br from-orange-600 to-purple-600 text-white pt-24 pb-32 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <ImageWithFallback
                        src={gymData.coverPhoto}
                        alt="Gym Cover"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 to-purple-600/90"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-white mb-2">Gym Owner Profile</h1>
                                <p className="text-orange-100">Operational identity and facility management</p>
                            </div>
                            {onBack && (
                                <Button
                                    variant="outline"
                                    onClick={onBack}
                                    className="bg-transparent border-none text-white hover:bg-white hover:text-orange-600"
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

                        {/* Gym Identity Card - Featured */}
                        <Card className="border-gray-200 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-orange-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
                            <CardContent className="p-8 relative z-10">
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                                    {/* Gym Logo */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                                            <ImageWithFallback
                                                src={gymData.photo}
                                                alt={gymData.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg transform hover:scale-110">
                                            <Camera className="h-5 w-5" />
                                        </button>
                                        {gymData.verified && (
                                            <div className="absolute -top-2 -left-2">
                                                <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-md">
                                                    <Shield className="h-3 w-3 mr-1" />
                                                    Verified
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    {/* Basic Info */}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h2 className="text-3xl text-gray-900 mb-3">{gymData.name}</h2>
                                                <div className="space-y-2">
                                                    <div className="flex items-start gap-2 text-gray-600">
                                                        <MapPin className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                        <span>{gymData.address}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-600">
                                                        <Clock className="h-5 w-5 text-orange-600 flex-shrink-0" />
                                                        <span className="text-sm">{gymData.operatingHours}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => setIsEditing(!isEditing)}
                                                className={isEditing
                                                    ? "bg-green-600 hover:bg-green-700 shadow-md"
                                                    : "bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 shadow-md"
                                                }
                                            >
                                                {isEditing ? (
                                                    <>
                                                        <Check className="h-4 w-4 mr-2" />
                                                        Save
                                                    </>
                                                ) : (
                                                    <>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Facilities Overview */}
                        <Card className="border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-orange-600 via-purple-600 to-orange-600"></div>
                            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-orange-50 to-purple-50">
                                <CardTitle className="flex items-center gap-2">
                                    <Dumbbell className="h-5 w-5 text-orange-600" />
                                    Facilities Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border-2 border-orange-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                                <Award className="h-6 w-6 text-orange-600" />
                                            </div>
                                            <label className="text-sm text-gray-600">Equipment Level</label>
                                        </div>
                                        <p className="text-xl text-gray-900">{gymData.equipmentLevel}</p>
                                    </div>

                                    <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                                <Building2 className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <label className="text-sm text-gray-600">Space Type</label>
                                        </div>
                                        <p className="text-xl text-gray-900">{gymData.spaceType}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-500 mb-4 block flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-orange-600" />
                                        Special Facilities
                                    </label>
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {gymData.specialFacilities.map((facility, idx) => {
                                            const Icon = facility.icon;
                                            return (
                                                <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                                                        <Icon className="h-5 w-5 text-orange-600" />
                                                    </div>
                                                    <span className="text-gray-900">{facility.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Associated People */}
                        <Card className="border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                            <div className="h-2 bg-gradient-to-r from-purple-600 to-orange-600"></div>
                            <CardHeader className="border-b border-gray-100 bg-gray-50">
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-purple-600" />
                                    Associated People
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="text-center p-8 bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 rounded-2xl border-2 border-orange-200 hover:border-orange-400 transition-colors">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <Dumbbell className="h-10 w-10 text-white" />
                                        </div>
                                        <p className="text-5xl text-orange-600 mb-2">{gymData.trainersOnboarded}</p>
                                        <p className="text-sm text-gray-600">Trainers Onboarded</p>
                                    </div>

                                    <div className="text-center p-8 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-colors">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                            <Users className="h-10 w-10 text-white" />
                                        </div>
                                        <p className="text-5xl text-purple-600 mb-2">{gymData.activeMembers}</p>
                                        <p className="text-sm text-gray-600">Active Learners</p>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-xs text-blue-700 text-center">
                                        <TrendingUp className="h-4 w-4 inline mr-1" />
                                        Count only — simple overview of your community
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Membership Settings */}
                        <Card className="border-gray-200 shadow-sm">
                            <CardHeader className="border-b border-gray-100 bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5 text-green-600" />
                                        Membership Settings
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                        Manage Plans
                                        <ChevronRight className="h-4 w-4 ml-1" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-sm text-gray-500 mb-4 block">Active Plans</label>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {gymData.activePlans.map((plan, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`relative p-5 rounded-xl border-2 transition-all hover:shadow-lg ${plan.popular
                                                        ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100'
                                                        : 'border-gray-200 bg-white hover:border-green-300'
                                                        }`}
                                                >
                                                    {plan.popular && (
                                                        <div className="absolute -top-3 left-4">
                                                            <Badge className="bg-green-600 text-white border-0 shadow-md">
                                                                <Star className="h-3 w-3 mr-1" />
                                                                Most Popular
                                                            </Badge>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className="text-gray-900 mb-1">{plan.name}</h4>
                                                            <Badge className={`${plan.popular
                                                                ? 'bg-green-600 text-white'
                                                                : 'bg-green-100 text-green-700'
                                                                } border-0`}>
                                                                {plan.price}
                                                            </Badge>
                                                        </div>
                                                        <ChevronRight className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <label className="text-sm text-gray-500 mb-3 block flex items-center gap-2">
                                            <Shield className="h-4 w-4 text-orange-600" />
                                            Trainer Access Rules
                                        </label>
                                        <div className="p-5 bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl border-2 border-orange-200">
                                            <p className="text-gray-900">
                                                {gymData.trainerAccessRules}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Controls */}
                        <Card className="border-gray-200 shadow-sm">
                            <CardHeader className="border-b border-gray-100 bg-gray-50">
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-gray-600" />
                                    Account Controls
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid md:grid-cols-2 gap-3">
                                    <Button variant="outline" className="justify-start border-gray-300 hover:bg-gray-50 hover:border-purple-300">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Gym Details
                                    </Button>
                                    <Button variant="outline" className="justify-start border-gray-300 hover:bg-gray-50 hover:border-orange-300">
                                        <Users className="h-4 w-4 mr-2" />
                                        Manage Trainers
                                    </Button>
                                    <Button variant="outline" className="justify-start border-gray-300 hover:bg-gray-50 hover:border-green-300">
                                        <DollarSign className="h-4 w-4 mr-2" />
                                        Billing & Payouts
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
            </section>
        </div>
    );
}
