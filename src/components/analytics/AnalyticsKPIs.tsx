import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Users, DollarSign, Calendar, AlertCircle, ShieldCheck } from "lucide-react";

export function AnalyticsKPIs() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Compliance Score</CardTitle>
                    <div className="p-2 bg-lime-500/20 rounded-full">
                        <ShieldCheck className="h-4 w-4 text-lime-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">92%</div>
                    <p className="text-xs text-gray-500 mt-1">
                        <span className="text-lime-400 font-bold">Audit Ready</span> (Grade A)
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
                    <div className="p-2 bg-yellow-500/20 rounded-full">
                        <DollarSign className="h-4 w-4 text-yellow-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">$45,231.89</div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="text-yellow-400 flex items-center bg-yellow-400/10 px-1 rounded-sm">
                            +20.1% <ArrowUpRight className="h-3 w-3 ml-0.5" />
                        </span>
                        <span>vs last month</span>
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Fill Rate</CardTitle>
                    <div className="p-2 bg-blue-500/20 rounded-full">
                        <Calendar className="h-4 w-4 text-blue-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">88.5%</div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="text-blue-400 flex items-center bg-blue-400/10 px-1 rounded-sm">
                            +4% <ArrowUpRight className="h-3 w-3 ml-0.5" />
                        </span>
                        <span>booked</span>
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">Retention Rate</CardTitle>
                    <div className="p-2 bg-purple-500/20 rounded-full">
                        <Users className="h-4 w-4 text-purple-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">76.2%</div>
                    <p className="text-xs text-gray-500 mt-1">
                        Repeat customers
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-black/40 border-white/10 text-white backdrop-blur-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">No-Show Rate</CardTitle>
                    <div className="p-2 bg-red-500/20 rounded-full">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">2.4%</div>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="text-green-400 flex items-center bg-green-400/10 px-1 rounded-sm">
                            -1.1% <ArrowDownRight className="h-3 w-3 ml-0.5" />
                        </span>
                        <span>improved</span>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
