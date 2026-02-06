import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import StatisticsChart from "@/components/dashboard/StatisticsChart";
import ActiveCalls from "@/components/dashboard/ActiveCalls";
import UserList from "@/components/dashboard/UserList";
import ScheduleWidget from "@/components/dashboard/ScheduleWidget";
import ComplianceWidget from "@/components/dashboard/ComplianceWidget";
import TimeTrackingWidget from "@/components/dashboard/TimeTrackingWidget";
import DocumentsWidget from "@/components/dashboard/DocumentsWidget";
import { ArrowUpRight } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-[#151521] overflow-hidden font-['Inter']">
            <Sidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <TopBar />

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-12 gap-8 max-w-[1600px] mx-auto">

                        {/* Main Content Column */}
                        <div className="col-span-12 lg:col-span-9 flex flex-col gap-8">
                            <StatisticsChart />

                            {/* New Modules Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <ScheduleWidget />
                                <ComplianceWidget />
                                <TimeTrackingWidget />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Ongoing Calls</h2>
                                <ActiveCalls />
                            </div>
                        </div>

                        {/* Right Sidebar Column */}
                        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                            <UserList
                                title="Starting calls"
                                users={[
                                    { name: "Liam Grayson", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80" },
                                    { name: "Mia Jennings", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
                                ]}
                            />

                            <UserList
                                title="Break"
                                users={[
                                    { name: "Jack Linton", status: "Cigarette brake", time: "00:17", badgeColor: "yellow", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
                                    { name: "Samuel Waters", status: "Lunch break", time: "00:19", badgeColor: "purple", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80" },
                                    { name: "Henry Mercer", status: "Lunch break", time: "10:51", badgeColor: "purple", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
                                    { name: "Amelia Rowann", status: "Cigarette brake", time: "30:42", badgeColor: "yellow", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" },
                                ]}
                            />

                            <DocumentsWidget />

                            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-center relative overflow-hidden group cursor-pointer">
                                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="text-white" />
                                </div>
                                <div className="flex justify-center -space-x-3 mb-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-transparent bg-white/20">
                                            <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=100&q=80`} className="w-full h-full rounded-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-1">+278k</h3>
                                <p className="text-indigo-100 text-sm">Customers worldwide</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
