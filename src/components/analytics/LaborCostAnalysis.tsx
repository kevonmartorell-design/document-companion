"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
    { name: "Week 1", Regular: 4000, Overtime: 240 },
    { name: "Week 2", Regular: 3000, Overtime: 1398 },
    { name: "Week 3", Regular: 2000, Overtime: 9800 }, // Intentionally high for demo? Maybe tone down.
    { name: "Week 4", Regular: 2780, Overtime: 3908 },
    { name: "Week 5", Regular: 1890, Overtime: 4800 },
];
// Fixing data to look more realistic
const realisticData = [
    { name: "Week 1", Regular: 12500, Overtime: 1200 },
    { name: "Week 2", Regular: 12800, Overtime: 900 },
    { name: "Week 3", Regular: 13200, Overtime: 2400 },
    { name: "Week 4", Regular: 12100, Overtime: 800 },
];

export function LaborCostAnalysis() {
    return (
        <Card className="col-span-4 lg:col-span-2 bg-black/40 border-white/10 text-white backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-gray-200">Labor Cost Analysis</CardTitle>
                <CardDescription className="text-gray-500">
                    Regular vs. Overtime pay breakdown per week.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={realisticData}>
                            <XAxis
                                dataKey="name"
                                stroke="#525252"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#525252"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ backgroundColor: '#1E1E2D', border: '1px solid #333', borderRadius: '8px' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            <Bar dataKey="Regular" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} barSize={30} />
                            <Bar dataKey="Overtime" stackId="a" fill="#fbbf24" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
