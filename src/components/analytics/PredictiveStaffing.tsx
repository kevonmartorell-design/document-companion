"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Sparkles } from "lucide-react";

const data = [
    { day: "Mon", Actual: 45, Predicted: 48 },
    { day: "Tue", Actual: 52, Predicted: 50 },
    { day: "Wed", Actual: 49, Predicted: 55 },
    { day: "Thu", Actual: 60, Predicted: 62 },
    { day: "Fri", Actual: 75, Predicted: 78 },
    { day: "Sat", Actual: 85, Predicted: 90 },
    { day: "Sun", Actual: 35, Predicted: 40 },
];

export function PredictiveStaffing() {
    return (
        <Card className="col-span-4 lg:col-span-2 bg-black/40 border-white/10 text-white backdrop-blur-md">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <Sparkles className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                        <CardTitle className="text-gray-200">AI Staffing Forecast</CardTitle>
                        <CardDescription className="text-gray-500">
                            Predicted staffing needs vs actuals for the upcoming week.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <XAxis dataKey="day" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1E1E2D', border: '1px solid #333', borderRadius: '8px' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Line type="monotone" dataKey="Actual" stroke="#94a3b8" strokeWidth={2} dot={{ r: 4, fill: "#94a3b8" }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="Predicted" stroke="#6366f1" strokeWidth={3} strokeDasharray="0" dot={{ r: 4, fill: "#6366f1" }} activeDot={{ r: 8, strokeWidth: 0 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
