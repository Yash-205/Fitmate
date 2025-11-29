import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react';

export function Profile() {
    const { user } = useAuth();

    // Mock user data if not fully available in auth context
    const userProfile = {
        name: user?.name || 'John Doe',
        email: user?.email || 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        bio: 'Fitness enthusiast passionate about strength training and healthy living.',
        joinDate: 'January 2024'
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                    </div>

                    <div className="grid gap-6">
                        {/* Main Profile Card */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <User className="h-12 w-12 text-orange-600" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{userProfile.name}</h2>
                                        <p className="text-gray-600 mb-4">{userProfile.bio}</p>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <MapPin className="mr-1 h-4 w-4" />
                                                {userProfile.location}
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="mr-1 h-4 w-4" />
                                                Joined {userProfile.joinDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Email</p>
                                        <p className="text-gray-900">{userProfile.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Phone</p>
                                        <p className="text-gray-900">{userProfile.phone}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                                        Log Out
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

function Calendar(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    )
}
