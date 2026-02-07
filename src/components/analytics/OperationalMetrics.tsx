import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function OperationalMetrics() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Expirations & Failures */}
            <Card className="col-span-1 bg-black/40 border-white/10 text-white backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-gray-200">Expirations & Criticals</CardTitle>
                    <CardDescription className="text-gray-500">Licenses and docs requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                                <span className="text-sm font-medium text-gray-200">Expired Licenses</span>
                            </div>
                            <span className="text-sm font-bold text-red-400">4</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                                <span className="text-sm font-medium text-gray-200">Expiring &lt; 30 Days</span>
                            </div>
                            <span className="text-sm font-bold text-yellow-400">12</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                                <span className="text-sm font-medium text-gray-200">Missing Training</span>
                            </div>
                            <span className="text-sm font-bold text-orange-400">7</span>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="text-xs text-gray-500 mb-2">Detailed Status</div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">Training Compliance</span>
                            <span className="font-bold text-green-400">89%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 rounded-full mt-2">
                            <div className="bg-green-500 h-2 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" style={{ width: "89%" }} />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Top Clients/Services */}
            <Card className="col-span-1 bg-black/40 border-white/10 text-white backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-gray-200">Top Revenue Sources</CardTitle>
                    <CardDescription className="text-gray-500">Highest generating clients & services</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-indigo-500/30">
                                    <AvatarFallback className="bg-indigo-500/20 text-indigo-300">AM</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-gray-200">Acme Security</p>
                                    <p className="text-xs text-gray-500">$12.5k / mo</p>
                                </div>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">+12%</Badge>
                        </div>
                        <div className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-blue-500/30">
                                    <AvatarFallback className="bg-blue-500/20 text-blue-300">GL</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-gray-200">Global Tech</p>
                                    <p className="text-xs text-gray-500">$8.2k / mo</p>
                                </div>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">+5%</Badge>
                        </div>
                        <div className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 border-2 border-purple-500/30">
                                    <AvatarFallback className="bg-purple-500/20 text-purple-300">ST</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium text-gray-200">Stark Ind.</p>
                                    <p className="text-xs text-gray-500">$6.8k / mo</p>
                                </div>
                            </div>
                            <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30">0%</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>


            {/* Recent Activity */}
            <Card className="col-span-1 bg-black/40 border-white/10 text-white backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-gray-200">Recent Activity</CardTitle>
                    <CardDescription className="text-gray-500">Latest system logs</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-white/10 before:content-['']">
                        {[
                            { action: "New appointment booked", time: "2 min ago", user: "Customer", color: "bg-blue-500" },
                            { action: "Employee checked in", time: "15 min ago", user: "John Doe", color: "bg-green-500" },
                            { action: "Invoice #1024 paid", time: "1 hr ago", user: "System", color: "bg-purple-500" },
                            { action: "Shift schedule updated", time: "2 hrs ago", user: "Admin", color: "bg-orange-500" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm relative">
                                <div className={`h-6 w-6 rounded-full ${item.color.replace('bg-', 'bg-')}/20 border ${item.color.replace('bg-', 'border-')}/50 flex items-center justify-center shrink-0 z-10 bg-black`}>
                                    <div className={`h-2 w-2 rounded-full ${item.color}`} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-200">{item.action}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.time} • {item.user}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
