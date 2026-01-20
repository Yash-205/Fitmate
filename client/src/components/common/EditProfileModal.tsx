
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Loader2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

interface EditProfileModalProps {
    open: boolean;
    onClose: () => void;
    onProfileUpdated: () => void;
}

export function EditProfileModal({ open, onClose, onProfileUpdated }: EditProfileModalProps) {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        bio: user?.bio || '',
        // Stats
        age: user?.age || '',
        gender: user?.gender || '',
        height: user?.height || '',
        weight: user?.weight || '',
        targetWeight: user?.targetWeight || '',
        activityLevel: user?.activityLevel || '',
        // Arrays
        fitnessGoals: user?.fitnessGoals || [],
        dietaryPreferences: user?.dietaryPreferences || [],
        injuries: user?.injuries || [],
    });

    // Temp state for array inputs
    const [newGoal, setNewGoal] = useState('');
    const [newDiet, setNewDiet] = useState('');
    const [newInjury, setNewInjury] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = (field: 'fitnessGoals' | 'dietaryPreferences' | 'injuries', value: string, setter: (val: string) => void) => {
        if (!value.trim()) return;
        setFormData(prev => ({
            ...prev,
            [field]: [...(prev[field] || []), value.trim()]
        }));
        setter('');
    };

    const handleRemoveItem = (field: 'fitnessGoals' | 'dietaryPreferences' | 'injuries', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field]?.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepare payload
            const payload = {
                ...formData,
                age: formData.age ? Number(formData.age) : undefined,
                height: formData.height ? Number(formData.height) : undefined,
                weight: formData.weight ? Number(formData.weight) : undefined,
                targetWeight: formData.targetWeight ? Number(formData.targetWeight) : undefined,
            };

            const response = await api.put('/users/profile', payload);
            updateUser(response.data as any);
            onProfileUpdated();
            toast.success('Profile updated successfully!');
            onClose();
        } catch (error) {
            console.error('Failed to update profile:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update your personal information and fitness details.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="font-medium text-gray-900 border-b pb-2">Basic Info</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself..." />
                        </div>
                    </div>

                    {/* Physical Stats */}
                    {user?.role === 'learner' && (
                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-900 border-b pb-2">Physical Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Select value={formData.gender} onValueChange={(val) => handleSelectChange('gender', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="height">Height (cm)</Label>
                                    <Input id="height" name="height" type="number" value={formData.height} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                                    <Input id="targetWeight" name="targetWeight" type="number" value={formData.targetWeight} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="activityLevel">Activity Level</Label>
                                    <Select value={formData.activityLevel} onValueChange={(val) => handleSelectChange('activityLevel', val)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sedentary">Sedentary (Little or no exercise)</SelectItem>
                                            <SelectItem value="lightly_active">Lightly Active (1-3 days/week)</SelectItem>
                                            <SelectItem value="moderately_active">Moderately Active (3-5 days/week)</SelectItem>
                                            <SelectItem value="very_active">Very Active (6-7 days/week)</SelectItem>
                                            <SelectItem value="extra_active">Extra Active (Physical job or training)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Lists (Goals, Diet, Injuries) */}
                    {user?.role === 'learner' && (
                        <div className="space-y-4">
                            <h3 className="font-medium text-gray-900 border-b pb-2">Details</h3>

                            {/* Fitness Goals */}
                            <div className="space-y-2">
                                <Label>Fitness Goals</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={newGoal}
                                        onChange={(e) => setNewGoal(e.target.value)}
                                        placeholder="Add a goal (e.g. Lose weight)"
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('fitnessGoals', newGoal, setNewGoal))}
                                    />
                                    <Button type="button" size="icon" onClick={() => handleAddItem('fitnessGoals', newGoal, setNewGoal)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.fitnessGoals?.map((goal, index) => (
                                        <Badge key={index} variant="secondary" className="gap-1 pr-1">
                                            {goal}
                                            <X
                                                className="h-3 w-3 cursor-pointer hover:text-red-500"
                                                onClick={() => handleRemoveItem('fitnessGoals', index)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Dietary Preferences */}
                            <div className="space-y-2">
                                <Label>Dietary Preferences</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={newDiet}
                                        onChange={(e) => setNewDiet(e.target.value)}
                                        placeholder="Add preference (e.g. Vegan)"
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('dietaryPreferences', newDiet, setNewDiet))}
                                    />
                                    <Button type="button" size="icon" onClick={() => handleAddItem('dietaryPreferences', newDiet, setNewDiet)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.dietaryPreferences?.map((diet, index) => (
                                        <Badge key={index} variant="secondary" className="gap-1 pr-1">
                                            {diet}
                                            <X
                                                className="h-3 w-3 cursor-pointer hover:text-red-500"
                                                onClick={() => handleRemoveItem('dietaryPreferences', index)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Injuries */}
                            <div className="space-y-2">
                                <Label>Injuries / Limitations</Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={newInjury}
                                        onChange={(e) => setNewInjury(e.target.value)}
                                        placeholder="Add injury (e.g. Knee pain)"
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem('injuries', newInjury, setNewInjury))}
                                    />
                                    <Button type="button" size="icon" onClick={() => handleAddItem('injuries', newInjury, setNewInjury)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.injuries?.map((injury, index) => (
                                        <Badge key={index} variant="secondary" className="gap-1 pr-1">
                                            {injury}
                                            <X
                                                className="h-3 w-3 cursor-pointer hover:text-red-500"
                                                onClick={() => handleRemoveItem('injuries', index)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
