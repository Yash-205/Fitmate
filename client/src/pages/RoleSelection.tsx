import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dumbbell, Users, Building2, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

type RoleType = 'learner' | 'trainer' | 'gymowner';

interface RoleCardProps {
    role: RoleType;
    title: string;
    description: string;
    icon: React.ElementType;
    features: string[];
    selected: boolean;
    onSelect: () => void;
}

function RoleCard({ role, title, description, icon: Icon, features, selected, onSelect }: RoleCardProps) {
    return (
        <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selected ? 'ring-2 ring-orange-600 shadow-lg' : ''
                }`}
            onClick={onSelect}
        >
            <CardHeader>
                <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-8 w-8 text-orange-600" />
                    </div>
                    {selected && <CheckCircle2 className="h-6 w-6 text-orange-600" />}
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

export function RoleSelection() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        bio: '',
        // Learner fields
        fitnessGoals: [] as string[],
        experienceLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
        preferredWorkouts: [] as string[],
        // Trainer fields
        certifications: [] as string[],
        specializations: [] as string[],
        yearsOfExperience: 0,
        // Gym Owner fields
        gymName: '',
        gymLocation: '',
        facilities: [] as string[],
    });

    const roles = [
        {
            role: 'learner' as RoleType,
            title: 'Learner',
            description: 'Start your fitness journey with personalized guidance',
            icon: Dumbbell,
            features: [
                'Access to personalized workout plans',
                'Connect with certified trainers',
                'Track your fitness progress',
                'Join fitness challenges',
            ],
        },
        {
            role: 'trainer' as RoleType,
            title: 'Trainer',
            description: 'Share your expertise and help others achieve their goals',
            icon: Users,
            features: [
                'Create and manage client profiles',
                'Design custom workout programs',
                'Track client progress',
                'Build your professional brand',
            ],
        },
        {
            role: 'gymowner' as RoleType,
            title: 'Gym Owner',
            description: 'Manage your gym and grow your fitness business',
            icon: Building2,
            features: [
                'Showcase your gym facilities',
                'Manage memberships',
                'Connect with potential members',
                'Promote your gym services',
            ],
        },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) {
            alert('Please select a role');
            return;
        }

        setLoading(true);
        try {
            const payload: any = {
                role: selectedRole,
                phone: formData.phone,
                bio: formData.bio,
            };

            // Add role-specific fields
            if (selectedRole === 'learner') {
                payload.fitnessGoals = formData.fitnessGoals;
                payload.experienceLevel = formData.experienceLevel;
                payload.preferredWorkouts = formData.preferredWorkouts;
            } else if (selectedRole === 'trainer') {
                payload.certifications = formData.certifications;
                payload.specializations = formData.specializations;
                payload.yearsOfExperience = formData.yearsOfExperience;
            } else if (selectedRole === 'gymowner') {
                payload.gymName = formData.gymName;
                payload.gymLocation = formData.gymLocation;
                payload.facilities = formData.facilities;
            }

            await api.put('/profile/role', payload);

            // Refresh the page to update user context
            window.location.href = '/';
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to update role');
        } finally {
            setLoading(false);
        }
    };

    const handleArrayInput = (field: string, value: string) => {
        const items = value.split(',').map(item => item.trim()).filter(item => item);
        setFormData({ ...formData, [field]: items });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome to FitMate, {user?.name}! 🎉
                    </h1>
                    <p className="text-xl text-gray-600">
                        Let's get you started by choosing your role
                    </p>
                </div>

                {/* Role Selection Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {roles.map((roleData) => (
                        <RoleCard
                            key={roleData.role}
                            {...roleData}
                            selected={selectedRole === roleData.role}
                            onSelect={() => setSelectedRole(roleData.role)}
                        />
                    ))}
                </div>

                {/* Role-specific Form */}
                {selectedRole && (
                    <Card className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CardHeader>
                            <CardTitle>Complete Your Profile</CardTitle>
                            <CardDescription>
                                Tell us more about yourself to get the best experience
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Common Fields */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number (Optional)
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bio (Optional)
                                    </label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                        rows={4}
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                {/* Learner-specific Fields */}
                                {selectedRole === 'learner' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Fitness Goals (comma-separated)
                                            </label>
                                            <input
                                                type="text"
                                                onChange={(e) => handleArrayInput('fitnessGoals', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                                placeholder="Weight loss, Build muscle, Improve endurance"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Experience Level
                                            </label>
                                            <select
                                                value={formData.experienceLevel}
                                                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as any })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                                required
                                            >
                                                <option value="beginner">Beginner</option>
                                                <option value="intermediate">Intermediate</option>
                                                <option value="advanced">Advanced</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Preferred Workouts (comma-separated)
                                            </label>
                                            <input
                                                type="text"
                                                onChange={(e) => handleArrayInput('preferredWorkouts', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                                placeholder="Cardio, Strength training, Yoga"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Trainer-specific Fields */}
                                {selectedRole === 'trainer' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Certifications (comma-separated)
                                            </label>
                                            <input
                                                type="text"
                                                onChange={(e) => handleArrayInput('certifications', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                                placeholder="NASM CPT, ACE, ISSA"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Specializations (comma-separated)
                                            </label>
                                            <input
                                                type="text"
                                                onChange={(e) => handleArrayInput('specializations', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                                placeholder="Weight loss, Strength training, Sports performance"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Years of Experience
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.yearsOfExperience}
                                                onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                                min="0"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Gym Owner-specific Fields */}
                                {selectedRole === 'gymowner' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Gym Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.gymName}
                                                onChange={(e) => setFormData({ ...formData, gymName: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                                placeholder="FitZone Gym"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Gym Location
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.gymLocation}
                                                onChange={(e) => setFormData({ ...formData, gymLocation: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                                placeholder="123 Main St, City, State"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Facilities (comma-separated)
                                            </label>
                                            <input
                                                type="text"
                                                onChange={(e) => handleArrayInput('facilities', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                                                placeholder="Free weights, Cardio machines, Swimming pool"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setSelectedRole(null)}
                                        className="flex-1"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                                    >
                                        {loading ? 'Saving...' : 'Complete Profile'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
