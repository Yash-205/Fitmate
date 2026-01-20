import { useState } from "react";
import {
    DollarSign,
    TrendingUp,
    Users,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    Calendar,
    CheckCircle,
    Star,
    Shield,
    Award
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

// --- Mock Data ---

const earningsHistory = [
    { month: 'Jan', earnings: 3200 },
    { month: 'Feb', earnings: 3800 },
    { month: 'Mar', earnings: 3500 },
    { month: 'Apr', earnings: 4200 },
    { month: 'May', earnings: 4600 },
    { month: 'Jun', earnings: 5120 },
];

const subscriptions = [
    { id: 1, client: "Sarah J.", plan: "Premium Coaching", start: "Oct 1, 2024", renew: "Nov 1, 2024", price: 200, status: "Active" },
    { id: 2, client: "Mike C.", plan: "Basic Plan", start: "Sep 15, 2024", renew: "Oct 15, 2024", price: 100, status: "Active" },
    { id: 3, client: "Emily R.", plan: "Premium Coaching", start: "Oct 5, 2024", renew: "Nov 5, 2024", price: 200, status: "Active" },
    { id: 4, client: "Alex M.", plan: "Consultation", start: "Oct 10, 2024", renew: "-", price: 150, status: "Completed" },
    { id: 5, client: "David K.", plan: "Basic Plan", start: "Aug 1, 2024", renew: "Nov 1, 2024", price: 100, status: "Paused" },
];

const payouts = [
    { id: "INV-001", date: "Oct 01, 2024", amount: 4850, method: "Bank Transfer", status: "Paid" },
    { id: "INV-002", date: "Sep 01, 2024", amount: 4150, method: "Bank Transfer", status: "Paid" },
    { id: "INV-003", date: "Aug 01, 2024", amount: 3900, method: "Bank Transfer", status: "Paid" },
];

const funnelData = [
    { stage: 'Profile Views', count: 1240 },
    { stage: 'Trial Started', count: 180 },
    { stage: 'Paid Client', count: 45 },
    { stage: 'Retained >3mo', count: 32 },
];

export function TrainerEarnings() {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">

                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Earnings & Performance</h1>
                        <p className="text-gray-500 mt-1">Track your growth, subscriptions, and payouts.</p>
                    </div>
                    <Button variant="outline" className="border-gray-300">
                        <Download className="w-4 h-4 mr-2" />
                        Download Tax Report
                    </Button>
                </div>

                {/* TOP SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <DollarSign className="w-6 h-6 text-green-600" />
                                </div>
                                <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    <ArrowUpRight className="w-3 h-3 mr-1" />
                                    +12%
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">Total Earnings (Oct)</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">$5,120.00</h3>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-blue-600" />
                                </div>
                                <span className="flex items-center text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                    Projected
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">Projected (Nov)</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">$5,800.00</h3>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Users className="w-6 h-6 text-purple-600" />
                                </div>
                                <span className="flex items-center text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                                    <Star className="w-3 h-3 mr-1" />
                                    Top 5%
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">Client Retention</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">94%</h3>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <CreditCard className="w-6 h-6 text-orange-600" />
                                </div>
                                <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    <ArrowUpRight className="w-3 h-3 mr-1" />
                                    +$15
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">Avg Rev / Client</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">$185.00</h3>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* SECTION 1: MONTHLY EARNINGS */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle>Revenue Breakdown</CardTitle>
                                <CardDescription>Income sources and monthly growth trend.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={earningsHistory}>
                                            <defs>
                                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} tickFormatter={(val) => `$${val}`} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                formatter={(val: number) => [`$${val}`, 'Earnings']}
                                            />
                                            <Area type="monotone" dataKey="earnings" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-xs text-gray-500 font-medium mb-1">Subscriptions</p>
                                        <p className="text-lg font-bold text-gray-900">$3,850</p>
                                        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                            <div className="bg-blue-500 h-full w-[75%]"></div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-xs text-gray-500 font-medium mb-1">1:1 Sessions</p>
                                        <p className="text-lg font-bold text-gray-900">$850</p>
                                        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                            <div className="bg-orange-500 h-full w-[20%]"></div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-xs text-gray-500 font-medium mb-1">Bonuses</p>
                                        <p className="text-lg font-bold text-gray-900">$420</p>
                                        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                                            <div className="bg-purple-500 h-full w-[5%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* SECTION 2: ACTIVE SUBSCRIPTIONS */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Active Subscriptions</CardTitle>
                                    <CardDescription>Manage client billing and plans.</CardDescription>
                                </div>
                                <Button variant="outline" size="sm">View All</Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Client</TableHead>
                                            <TableHead>Plan</TableHead>
                                            <TableHead>Renewal</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {subscriptions.map((sub) => (
                                            <TableRow key={sub.id}>
                                                <TableCell className="font-medium">{sub.client}</TableCell>
                                                <TableCell>{sub.plan}</TableCell>
                                                <TableCell>{sub.renew}</TableCell>
                                                <TableCell>${sub.price}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            sub.status === "Active" ? "bg-green-50 text-green-700 border-green-200" :
                                                                sub.status === "Paused" ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-gray-50 text-gray-700"
                                                        }
                                                    >
                                                        {sub.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm">Manage</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        {/* SECTION 4: PERFORMANCE BONUS */}
                        <Card className="border-0 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Award className="w-5 h-5 text-yellow-500" />
                                    <span className="text-sm font-bold text-yellow-600 uppercase tracking-widest">Bonus Tracker</span>
                                </div>
                                <CardTitle className="text-lg">Dec '24 Performance Bonus</CardTitle>
                                <CardDescription>Unlock extra 5% revenue share.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 relative z-10">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Client Adherence {">"} 85%</span>
                                        <span className="font-bold text-gray-900">92%</span>
                                    </div>
                                    <Progress value={92} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Client Retention {">"} 60 days</span>
                                        <span className="font-bold text-gray-900">88%</span>
                                    </div>
                                    <Progress value={88} className="h-2 bg-gray-100" indicatorClassName="bg-blue-500" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Avg Rating {">"} 4.8</span>
                                        <span className="font-bold text-gray-900">4.9</span>
                                    </div>
                                    <Progress value={98} className="h-2 bg-gray-100" indicatorClassName="bg-yellow-500" />
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-yellow-800 uppercase">Estimated Bonus</p>
                                        <p className="text-xl font-bold text-yellow-900">$450.00</p>
                                    </div>
                                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* SECTION 5: CONVERSION METRICS */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Conversion Funnel</CardTitle>
                                <CardDescription>Optimize your profile to get more clients.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {funnelData.map((stage, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="flex justify-between text-sm mb-1 z-10 relative">
                                            <span className="text-gray-600">{stage.stage}</span>
                                            <span className="font-bold text-gray-900">{stage.count}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-8 rounded-md overflow-hidden relative">
                                            <div
                                                className={`h-full opacity-20 ${idx === 0 ? 'bg-purple-500' : idx === 1 ? 'bg-blue-500' : idx === 2 ? 'bg-green-500' : 'bg-orange-500'}`}
                                                style={{ width: `${(stage.count / funnelData[0].count) * 100}%` }}
                                            ></div>
                                            <div className="absolute top-0 right-2 h-full flex items-center">
                                                <span className="text-xs font-medium text-gray-500">
                                                    {Math.round((stage.count / (funnelData[idx - 1]?.count || stage.count)) * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 mt-2">
                                    View Improvement Insights
                                </Button>
                            </CardContent>
                        </Card>

                        {/* SECTION 3: PAYOUT HISTORY */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg">Recent Payouts</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {payouts.map((payout) => (
                                        <div key={payout.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-white rounded-md shadow-sm">
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">${payout.amount}</p>
                                                    <p className="text-xs text-gray-500">{payout.date}</p>
                                                </div>
                                            </div>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-gray-600">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-blue-900">Secure Payments</h4>
                                <p className="text-xs text-blue-700 mt-1">
                                    Your earnings are protected. Tax summaries are auto-generated for compliance.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
