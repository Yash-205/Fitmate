import { useState, useEffect } from "react";
import {
    Users,
    Search,
    Filter,
    MoreVertical,
    Calendar,
    CreditCard,
    FileText,
    Phone,
    MessageSquare,
    PauseCircle,
    Percent,
    UserCog,
    ChevronRight,
    TrendingDown,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    UserCheck,
    Mail
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ImageWithFallback } from "../common/figma/ImageWithFallback";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

// Types
type MemberStatus = "Active" | "Slowing Down" | "Risk";

interface Member {
    id: string;
    name: string;
    avatar: string;
    plan: string;
    lastVisit: string;
    attendance: number;
    trainer: string;
    status: MemberStatus;
    email: string;
    phone: string;
    joinDate: string;
}

const mockHistory = [
    { date: "Oct 24", activity: "Check-in", time: "6:30 PM" },
    { date: "Oct 22", activity: "Check-in", time: "6:15 PM" },
    { date: "Oct 20", activity: "Personal Training", time: "7:00 AM" },
    { date: "Oct 18", activity: "Check-in", time: "6:45 PM" },
];

const mockPayments = [
    { date: "Oct 01", item: "Monthly Membership", amount: "$89.00", status: "Paid" },
    { date: "Sep 01", item: "Monthly Membership", amount: "$89.00", status: "Paid" },
    { date: "Aug 15", item: "Protein Powder", amount: "$45.00", status: "Paid" },
];

export function GymOwnerMembers() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get('/gyms/members');
                const fetchedMembers = (response.data as any[]).map((user: any) => ({
                    id: user._id,
                    name: user.name,
                    avatar: user.avatar || "https://github.com/shadcn.png",
                    plan: user.plan || "Premium Monthly", // Default if missing
                    lastVisit: new Date(user.lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    attendance: user.attendance || 0,
                    trainer: user.trainerId ? user.trainerId.name : "Unassigned",
                    status: (user.status as MemberStatus) || "Active",
                    email: user.email,
                    phone: user.phone || "N/A",
                    joinDate: new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                }));
                setMembers(fetchedMembers);
            } catch (error) {
                console.error("Failed to fetch members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusBadge = (status: MemberStatus) => {
        switch (status) {
            case "Active":
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none">Active</Badge>;
            case "Slowing Down":
                return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-200 shadow-none">Slowing Down</Badge>;
            case "Risk":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 shadow-none">Risk</Badge>;
            default:
                return <Badge variant="outline">Unknown</Badge>;
        }
    };

    const getAttendanceColor = (score: number) => {
        if (score >= 80) return "text-green-600";
        if (score >= 50) return "text-orange-600";
        return "text-red-600";
    };

    const openMemberDetails = async (member: Member) => {
        setIsSheetOpen(true);
        // Set basic info first for immediate UI feedback
        setSelectedMember(member);

        try {
            const response = await api.get(`/gyms/members/${member.id}`);
            const detailData = response.data as any;

            // Transform backend data to text/objects for UI
            const enrichedMember = {
                ...member,
                recentActivity: detailData.recentActivity.map((activity: any) => ({
                    date: new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    activity: activity.title || activity.type || "Workout",
                    time: new Date(activity.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                })),
                paymentHistory: detailData.paymentHistory || [],
                stats: detailData.stats
            };

            setSelectedMember(enrichedMember as any); // Cast to handle new fields
        } catch (error) {
            console.error("Failed to fetch member details:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-purple-50/20 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">Member Directory</h1>
                        <p className="text-gray-500 text-lg">Manage relationships and track retention efficiently.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="gap-2 bg-white hover:bg-gray-50 border-gray-200 shadow-sm h-11 px-6 rounded-xl">
                            <Filter className="w-4 h-4" />
                            Filter
                        </Button>
                        <Button className="gap-2 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg shadow-orange-500/20 h-11 px-6 rounded-xl transition-all">
                            <Users className="w-4 h-4" />
                            Add Member
                        </Button>
                    </div>
                </div>

                {/* Stats Cards - Glassmorphism */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-green-500/20 transition-all"></div>
                        <CardContent className="p-6 relative">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-green-50 rounded-2xl border border-green-100 shadow-inner">
                                    <UserCheck className="w-8 h-8 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Active Members</p>
                                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{members.length}</h3>
                                    <div className="flex items-center text-xs font-medium text-green-600 mt-1">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        +12% vs last month
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-orange-500/20 transition-all"></div>
                        <CardContent className="p-6 relative">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 shadow-inner">
                                    <TrendingDown className="w-8 h-8 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Slowing Down</p>
                                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">12</h3>
                                    <div className="flex items-center text-xs font-medium text-orange-600 mt-1">
                                        Action required
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-red-500/20 transition-all"></div>
                        <CardContent className="p-6 relative">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-red-50 rounded-2xl border border-red-100 shadow-inner">
                                    <AlertTriangle className="w-8 h-8 text-red-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">At Risk</p>
                                    <h3 className="text-3xl font-bold text-gray-900 tracking-tight">5</h3>
                                    <div className="flex items-center text-xs font-medium text-red-600 mt-1">
                                        Urgent attention
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Table Card */}
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-md overflow-hidden rounded-3xl ring-1 ring-gray-100">
                    <CardHeader className="border-b border-gray-100 bg-white/50 px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search by name or email..."
                                    className="pl-10 h-10 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-300 transition-all rounded-xl"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Loading members...</div>
                        ) : filteredMembers.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No members found.</div>
                        ) : (
                            <Table>
                                <TableHeader className="bg-gray-50/80">
                                    <TableRow className="hover:bg-gray-50/80 border-gray-100">
                                        <TableHead className="w-[300px] pl-8 py-5 text-gray-500 font-semibold">Member Details</TableHead>
                                        <TableHead className="text-gray-500 font-semibold">Current Plan</TableHead>
                                        <TableHead className="text-gray-500 font-semibold">Last Visit</TableHead>
                                        <TableHead className="text-gray-500 font-semibold">Attendance</TableHead>
                                        <TableHead className="text-gray-500 font-semibold">Assigned Trainer</TableHead>
                                        <TableHead className="text-gray-500 font-semibold">Status</TableHead>
                                        <TableHead className="text-right pr-8 text-gray-500 font-semibold">View</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredMembers.map((member) => (
                                        <TableRow
                                            key={member.id}
                                            className="group cursor-pointer hover:bg-orange-50/30 transition-colors border-gray-50"
                                            onClick={() => navigate(`/gym-owner/members/${member.id}`)}
                                        >
                                            <TableCell className="pl-8 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <ImageWithFallback
                                                            src={member.avatar}
                                                            alt={member.name}
                                                            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-sm"
                                                        />
                                                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ring-2 ring-white ${member.status === 'Active' ? 'bg-green-500' : member.status === 'Slowing Down' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900">{member.name}</div>
                                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                                            <Mail className="w-3 h-3" />
                                                            {member.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="font-medium text-gray-700 border-gray-200 bg-white shadow-sm px-3 py-1">
                                                    {member.plan}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-gray-600 font-medium">{member.lastVisit}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full ${member.attendance >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' : member.attendance >= 50 ? 'bg-gradient-to-r from-orange-500 to-orange-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`}
                                                            style={{ width: `${member.attendance}%` }}
                                                        />
                                                    </div>
                                                    <span className={`font-bold text-sm ${getAttendanceColor(member.attendance)}`}>
                                                        {member.attendance}%
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-gray-600">
                                                {member.trainer !== "Unassigned" ? (
                                                    <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-gray-50 w-fit">
                                                        <UserCog className="w-3.5 h-3.5 text-gray-400" />
                                                        <span className="text-sm font-medium">{member.trainer}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 italic text-xs pl-2">Unassigned</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(member.status)}
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 group-hover:text-orange-600 group-hover:bg-orange-50 transition-all rounded-lg">
                                                    <ChevronRight className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Member Details Drawer */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto border-l-0 shadow-2xl p-0 bg-gray-50/50">
                        {selectedMember && (
                            <div className="h-full flex flex-col">
                                {/* Drawer Header with Gradient */}
                                <div className="bg-white border-b border-gray-100 p-6 pb-8 sticky top-0 z-10">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="relative mb-4">
                                            <ImageWithFallback
                                                src={selectedMember.avatar}
                                                alt={selectedMember.name}
                                                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-white shadow-xl"
                                            />
                                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ring-4 ring-white flex items-center justify-center ${selectedMember.status === 'Active' ? 'bg-green-500' : selectedMember.status === 'Slowing Down' ? 'bg-orange-500' : 'bg-red-500'}`}>
                                                {selectedMember.status === 'Active' && <CheckCircle className="w-3 h-3 text-white" />}
                                                {selectedMember.status === 'Slowing Down' && <TrendingDown className="w-3 h-3 text-white" />}
                                                {selectedMember.status === 'Risk' && <AlertTriangle className="w-3 h-3 text-white" />}
                                            </div>
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedMember.name}</h2>
                                        <p className="text-gray-500 text-sm mb-4">Member since {new Date(selectedMember.joinDate).toLocaleDateString()}</p>

                                        <div className="flex gap-2 w-full max-w-xs">
                                            <Button className="flex-1 bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200">
                                                <MessageSquare className="w-4 h-4 mr-2" /> Message
                                            </Button>
                                            <Button variant="outline" className="flex-1 bg-white border-gray-200 shadow-sm">
                                                <Phone className="w-4 h-4 mr-2" /> Call
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                                            <div className={`text-3xl font-bold mb-1 ${getAttendanceColor(selectedMember.attendance)}`}>{selectedMember.attendance}%</div>
                                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Attendance</div>
                                        </div>
                                        <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                                            <div className="text-3xl font-bold text-gray-900 mb-1">42</div>
                                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Visits</div>
                                        </div>
                                    </div>

                                    {/* Recent Activity */}
                                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-orange-600" />
                                            <h3 className="font-bold text-gray-900 text-sm">Recent Visits</h3>
                                        </div>
                                        <div className="divide-y divide-gray-50">
                                            {(selectedMember as any).recentActivity?.length > 0 ? (
                                                (selectedMember as any).recentActivity.map((visit: any, i: number) => (
                                                    <div key={i} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                                                                {visit.date.split(' ')[0]}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-gray-900 text-sm">{visit.activity}</div>
                                                                <div className="text-xs text-gray-500">{visit.date}</div>
                                                            </div>
                                                        </div>
                                                        <Badge variant="secondary" className="bg-gray-100 font-normal text-gray-500">
                                                            {visit.time}
                                                        </Badge>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-5 text-gray-500 text-sm text-center">No recent activity found.</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Financials */}
                                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                                        <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                                            <CreditCard className="w-4 h-4 text-blue-600" />
                                            <h3 className="font-bold text-gray-900 text-sm">Payment History</h3>
                                        </div>
                                        <div className="divide-y divide-gray-50">
                                            {(selectedMember as any).paymentHistory?.length > 0 ? (
                                                (selectedMember as any).paymentHistory.map((payment: any, i: number) => (
                                                    <div key={i} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors">
                                                        <div>
                                                            <div className="font-semibold text-gray-900 text-sm">{payment.item}</div>
                                                            <div className="text-xs text-gray-500">{payment.date}</div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="font-bold text-gray-900">{payment.amount}</div>
                                                            <div className="text-[10px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1">
                                                                {payment.status}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-5 text-gray-500 text-sm text-center">No payment history available.</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div className="bg-yellow-50/50 rounded-2xl border border-yellow-100 p-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <FileText className="w-4 h-4 text-yellow-600" />
                                            <h3 className="font-bold text-yellow-900 text-sm">Staff Notes</h3>
                                        </div>
                                        <div className="text-sm text-yellow-800 space-y-2">
                                            <p className="bg-white/50 p-2 rounded-lg border border-yellow-100"><strong>Oct 15:</strong> Complained about AC in cardio area. Gave 1 free smoothie voucher.</p>
                                            <p className="bg-white/50 p-2 rounded-lg border border-yellow-100"><strong>Sep 02:</strong> Mentioned knee pain, modified leg day program.</p>
                                        </div>
                                    </div>

                                    {/* Actions Area */}
                                    <div className="pt-2">
                                        <h3 className="font-bold text-gray-900 text-sm mb-3">Management Actions</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <Button variant="outline" className="justify-start gap-2 h-10 bg-white hover:bg-gray-50 border-gray-200">
                                                <UserCog className="w-4 h-4 text-gray-500" />
                                                Assign Trainer
                                            </Button>
                                            <Button variant="outline" className="justify-start gap-2 h-10 bg-white hover:bg-gray-50 border-gray-200">
                                                <PauseCircle className="w-4 h-4 text-orange-500" />
                                                Pause Plan
                                            </Button>
                                            <Button variant="outline" className="justify-start gap-2 h-10 bg-white hover:bg-gray-50 border-gray-200">
                                                <Percent className="w-4 h-4 text-blue-500" />
                                                Discount
                                            </Button>
                                            <Button variant="outline" className="justify-start gap-2 h-10 bg-white hover:border-red-200 hover:bg-red-50 text-red-600 border-gray-200">
                                                <AlertTriangle className="w-4 h-4" />
                                                Cancel Membership
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
