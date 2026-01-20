import {
    Settings,
    Clock,
    DollarSign,
    Users,
    Shield,
    CreditCard,
    Save,
    Building2,
    Bell,
    Lock,
    LogOut,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Key
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext"; // Assuming this exists or can be used
import { useNavigate } from "react-router-dom";

type Tab = 'facility' | 'pricing' | 'staff' | 'notifications';

export function GymOwnerSettings() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('facility');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // -- State Management for Settings --

    // Facility
    const [openTime, setOpenTime] = useState("06:00");
    const [closeTime, setCloseTime] = useState("23:00");
    const [autoLock, setAutoLock] = useState(true);
    const [capacityLimit, setCapacityLimit] = useState("150");

    // Pricing
    const [basicPrice, setBasicPrice] = useState("49.99");
    const [standardPrice, setStandardPrice] = useState("89.99");
    const [premiumPrice, setPremiumPrice] = useState("149.99");
    const [ptSplit, setPtSplit] = useState("60"); // % to trainer
    const [classBonus, setClassBonus] = useState("5.00");

    // Staff
    const [allow24x7Staff, setAllow24x7Staff] = useState(true);
    const [requireKeycard, setRequireKeycard] = useState(true);

    // Notifications
    const [notifyNewMember, setNotifyNewMember] = useState(true);
    const [notifyRevenue, setNotifyRevenue] = useState(true);
    const [notifyCapacity, setNotifyCapacity] = useState(true);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API Call
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1200);
    };

    const renderSidebarItem = (id: Tab, label: string, Icon: any) => {
        const isActive = activeTab === id;
        return (
            <Button
                variant="ghost"
                onClick={() => setActiveTab(id)}
                className={`w-full justify-start gap-3 h-12 transition-all duration-200 relative overflow-hidden ${isActive
                        ? "bg-white text-indigo-600 shadow-md font-semibold"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
            >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />}
                <Icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-gray-400"}`} />
                {label}
            </Button>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/20 to-indigo-50/20 pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Header */}
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Settings className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Settings
                            </h1>
                        </div>
                        <p className="text-gray-500 text-lg">Manage your gym's operational core.</p>
                    </div>

                    {saveSuccess && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-semibold">Changes Saved Successfully</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-gray-100/50 backdrop-blur-sm p-2 rounded-2xl border border-gray-200/50 space-y-1">
                                {renderSidebarItem('facility', 'Facility', Building2)}
                                {renderSidebarItem('pricing', 'Pricing & Billing', DollarSign)}
                                {renderSidebarItem('staff', 'Staff Access', Users)}
                                {renderSidebarItem('notifications', 'Notifications', Bell)}
                            </div>

                            <div className="bg-red-50/50 p-2 rounded-2xl border border-red-100/50">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-3 text-red-600 hover:bg-red-100 hover:text-red-700 h-12"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9 space-y-6">

                        {/* FACILITY SETTINGS */}
                        {activeTab === 'facility' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Operating Hours</CardTitle>
                                        <CardDescription>Configure when your gym is open to members.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">Open Time</label>
                                                <div className="relative">
                                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <Input type="time" value={openTime} onChange={(e) => setOpenTime(e.target.value)} className="pl-10 bg-gray-50 border-gray-200" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-gray-700">Close Time</label>
                                                <div className="relative">
                                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <Input type="time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} className="pl-10 bg-gray-50 border-gray-200" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Security & Limits</CardTitle>
                                        <CardDescription>Automated rules for facility management.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="divide-y divide-gray-100">
                                        <div className="flex items-center justify-between py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600">
                                                    <Lock className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">Auto-Lock Doors</p>
                                                    <p className="text-sm text-gray-500">Automatically secure facility 15 mins after close.</p>
                                                </div>
                                            </div>
                                            <Switch checked={autoLock} onCheckedChange={setAutoLock} />
                                        </div>
                                        <div className="flex items-center justify-between py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                                    <Users className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">Max Capacity Limit</p>
                                                    <p className="text-sm text-gray-500">Trigger alerts when occupancy hits this number.</p>
                                                </div>
                                            </div>
                                            <Input
                                                type="number"
                                                value={capacityLimit}
                                                onChange={(e) => setCapacityLimit(e.target.value)}
                                                className="w-24 text-center bg-gray-50"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* PRICING SETTINGS */}
                        {activeTab === 'pricing' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Membership Tiers</CardTitle>
                                        <CardDescription>Set the monthly pricing for your standard plans.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            { label: 'Basic', value: basicPrice, setter: setBasicPrice, color: 'bg-blue-50 text-blue-700' },
                                            { label: 'Standard', value: standardPrice, setter: setStandardPrice, color: 'bg-purple-50 text-purple-700' },
                                            { label: 'Premium', value: premiumPrice, setter: setPremiumPrice, color: 'bg-orange-50 text-orange-700' }
                                        ].map((tier) => (
                                            <div key={tier.label} className="space-y-3 p-4 border border-gray-100 rounded-2xl hover:border-indigo-100 hover:shadow-md transition-all">
                                                <Badge variant="secondary" className={tier.color}>{tier.label}</Badge>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                                                    <Input
                                                        value={tier.value}
                                                        onChange={(e) => tier.setter(e.target.value)}
                                                        className="pl-7 text-lg font-bold bg-white"
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-400">per month</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Trainer Commissions</CardTitle>
                                        <CardDescription>Define revenue splits for your staff.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                                            <div>
                                                <h4 className="font-semibold text-indigo-900">Personal Training Split</h4>
                                                <p className="text-sm text-indigo-700 mt-1">Percentage of session fee paid to trainer.</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Input
                                                    value={ptSplit}
                                                    onChange={(e) => setPtSplit(e.target.value)}
                                                    className="w-20 text-center font-bold text-indigo-700 border-indigo-200"
                                                />
                                                <span className="font-bold text-indigo-400">%</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">Class Bonus</h4>
                                                <p className="text-sm text-gray-500 mt-1">Flat fee bonus per attendee for group classes.</p>
                                            </div>
                                            <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-gray-200">
                                                <span className="pl-3 text-gray-400">$</span>
                                                <Input
                                                    value={classBonus}
                                                    onChange={(e) => setClassBonus(e.target.value)}
                                                    className="w-20 border-0 focus-visible:ring-0 px-1"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* STAFF SETTINGS */}
                        {activeTab === 'staff' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Access Control</CardTitle>
                                        <CardDescription>Manage who can access the facility and when.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="divide-y divide-gray-100">
                                        <div className="flex items-center justify-between py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                                    <Key className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">24/7 Staff Access</p>
                                                    <p className="text-sm text-gray-500">Allow trainers entry outside operating hours.</p>
                                                </div>
                                            </div>
                                            <Switch checked={allow24x7Staff} onCheckedChange={setAllow24x7Staff} />
                                        </div>
                                        <div className="flex items-center justify-between py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                                                    <Shield className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">Require Physical Keycard</p>
                                                    <p className="text-sm text-gray-500">Staff must use badge for entry (app not sufficient).</p>
                                                </div>
                                            </div>
                                            <Switch checked={requireKeycard} onCheckedChange={setRequireKeycard} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* NOTIFICATIONS SETTINGS */}
                        {activeTab === 'notifications' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle>Alert Preferences</CardTitle>
                                        <CardDescription>Choose what updates you want to receive.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {[
                                            { label: 'New Member Signup', sub: 'Get notified when a new client joins.', state: notifyNewMember, setter: setNotifyNewMember },
                                            { label: 'Revenue Milestones', sub: 'Weekly summaries and revenue goal hits.', state: notifyRevenue, setter: setNotifyRevenue },
                                            { label: 'Capacity Warnings', sub: 'Alert when gym exceeds 90% capacity.', state: notifyCapacity, setter: setNotifyCapacity },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{item.label}</h4>
                                                    <p className="text-sm text-gray-500">{item.sub}</p>
                                                </div>
                                                <Switch checked={item.state} onCheckedChange={item.setter} />
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Bottom Action Bar */}
                        <div className="sticky bottom-6 z-10">
                            <div className="bg-gray-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between backdrop-blur-md bg-opacity-95">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-gray-400" />
                                    <span className="text-sm text-gray-300">Unsaved changes will be lost.</span>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">Discard</Button>
                                    <Button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="bg-white text-gray-900 hover:bg-gray-100 min-w-[140px]"
                                    >
                                        {isSaving ? (
                                            <span className="flex items-center gap-2">
                                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></span>
                                                Saving...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Save className="w-4 h-4" /> Save Changes
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
