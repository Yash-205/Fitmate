import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    CreditCard,
    PieChart as PieChartIcon,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    Target,
    Activity,
    Users,
    ChevronRight,
    Landmark,
    Banknote,
    Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    Legend
} from "recharts";

export function GymOwnerFinance() {
    // Mock Data
    const revenueBreakdown = [
        { name: "Memberships", value: 45000, color: "#3b82f6" }, // Blue
        { name: "Personal Training", value: 32000, color: "#f97316" }, // Orange
        { name: "Classes", value: 12000, color: "#8b5cf6" }, // Purple
        { name: "Add-ons", value: 5000, color: "#10b981" } // Emerald
    ];

    const weeklyRevenue = [
        { day: "Mon", revenue: 4200, profit: 3100 },
        { day: "Tue", revenue: 3800, profit: 2500 },
        { day: "Wed", revenue: 5100, profit: 3800 },
        { day: "Thu", revenue: 4500, profit: 3200 },
        { day: "Fri", revenue: 5800, profit: 4100 },
        { day: "Sat", revenue: 6500, profit: 4800 },
        { day: "Sun", revenue: 3200, profit: 1800 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/20 pt-24 pb-16">
            <div className="container mx-auto px-4 max-w-7xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-emerald-50 rounded-lg">
                                <DollarSign className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                Financial Overview
                            </h1>
                        </div>
                        <p className="text-gray-500 text-lg">Detailed breakdown of revenue streams and profit margins.</p>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-1.5 rounded-xl shadow-sm border border-gray-100">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg px-4">
                            Last Month
                        </Button>
                        <Button variant="ghost" size="sm" className="bg-emerald-50 text-emerald-700 font-medium rounded-lg px-4 shadow-sm">
                            This Month
                        </Button>
                    </div>
                </div>

                {/* Top Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Revenue */}
                    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden group relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-emerald-500/20 transition-all"></div>
                        <CardContent className="p-6 relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-emerald-50 rounded-xl">
                                    <Wallet className="w-6 h-6 text-emerald-600" />
                                </div>
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                    <ArrowUpRight className="w-3 h-3 mr-1" /> +12.5%
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
                                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">$94,000</h3>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Trainer Payouts */}
                    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden group relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-blue-500/20 transition-all"></div>
                        <CardContent className="p-6 relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-50 rounded-xl">
                                    <Users className="w-6 h-6 text-blue-600" />
                                </div>
                                <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                                    Fixed & Commission
                                </Badge>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Trainer Payouts</p>
                                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">$32,500</h3>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Net Profit */}
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl overflow-hidden group relative">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:opacity-20 transition-all"></div>
                        <CardContent className="p-6 relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
                                    Margin: 65%
                                </Badge>
                            </div>
                            <div>
                                <p className="text-emerald-100 font-medium mb-1">Net Profit</p>
                                <h3 className="text-4xl font-bold text-white tracking-tight">$61,500</h3>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Revenue Breakdown */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
                            <CardHeader className="border-b border-gray-100 px-8 py-6">
                                <CardTitle className="text-lg font-bold text-gray-900">Revenue Streams</CardTitle>
                                <CardDescription>Breakdown by source over the last 30 days</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="h-[250px] w-full relative">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={revenueBreakdown}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                    stroke="none"
                                                >
                                                    {revenueBreakdown.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        {/* Center Content */}
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="text-center">
                                                <span className="block text-3xl font-bold text-gray-900">100%</span>
                                                <span className="text-xs text-gray-500 uppercase tracking-wide">Revenue</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {revenueBreakdown.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between group p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                    <span className="font-medium text-gray-700">{item.name}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-gray-900 font-bold">${item.value.toLocaleString()}</span>
                                                    <span className="text-xs text-gray-500 w-12 text-right">{((item.value / 94000) * 100).toFixed(1)}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Trends Chart */}
                        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
                            <CardHeader className="border-b border-gray-100 px-8 py-6">
                                <CardTitle className="text-lg font-bold text-gray-900">Profit Trends</CardTitle>
                                <CardDescription>Daily profit vs revenue comparison</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={weeklyRevenue} barGap={0}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af' }} tickFormatter={(value) => `$${value / 1000}k`} />
                                            <Tooltip
                                                cursor={{ fill: '#f9fafb' }}
                                                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Legend iconType="circle" />
                                            <Bar dataKey="revenue" name="Revenue" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={20} />
                                            <Bar dataKey="profit" name="Net Profit" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Insights & Actions */}
                    <div className="space-y-6">

                        {/* Auto-Generated Insights */}
                        <Card className="border-0 shadow-lg bg-indigo-50/50 border-indigo-100 rounded-3xl overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-indigo-600 fill-indigo-200" />
                                    <h3 className="font-bold text-indigo-900">Smart Insights</h3>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                                    <p className="text-sm text-gray-600 font-medium mb-1">High Margin Driver</p>
                                    <p className="text-indigo-900 font-bold leading-snug">Personal Training accounts for <span className="text-emerald-600">60%</span> of your total profit despite lower volume.</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100">
                                    <p className="text-sm text-gray-600 font-medium mb-1">Opportunity Alert</p>
                                    <p className="text-indigo-900 font-bold leading-snug">Evening crowd is high (98% cap) but fails to convert to add-on sales.</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide ml-1">Profit Boosters</h3>

                            <Button className="w-full justify-between bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm h-14 rounded-xl group p-4">
                                <div className="flex items-center gap-3 text-left">
                                    <div className="p-2 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                                        <TrendingUp className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Increase PT Pricing</div>
                                        <div className="text-xs text-gray-500">Update tier rates</div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600" />
                            </Button>

                            <Button className="w-full justify-between bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm h-14 rounded-xl group p-4">
                                <div className="flex items-center gap-3 text-left">
                                    <div className="p-2 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                                        <CreditCard className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Push Membership Upgrades</div>
                                        <div className="text-xs text-gray-500">Target 'Basic' users</div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600" />
                            </Button>

                            <Button className="w-full justify-between bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm h-14 rounded-xl group p-4">
                                <div className="flex items-center gap-3 text-left">
                                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                                        <Banknote className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Run Flash Offer</div>
                                        <div className="text-xs text-gray-500">Boost slow hours</div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600" />
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
