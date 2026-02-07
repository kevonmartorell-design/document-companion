"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
    { name: "Jan", total: 1500 },
    { name: "Feb", total: 2300 },
    { name: "Mar", total: 3400 },
    { name: "Apr", total: 2900 },
    { name: "May", total: 4500 },
    { name: "Jun", total: 5200 },
    { name: "Jul", total: 4800 },
    { name: "Aug", total: 6100 },
    { name: "Sep", total: 5800 },
    { name: "Oct", total: 6500 },
    { name: "Nov", total: 7200 },
    { name: "Dec", total: 8500 },
];

export function RevenueChart() {
    return (
        <Card className="col-span-4 bg-black/40 border-white/10 text-white backdrop-blur-md">
            <CardHeader>
                <CardTitle className="text-gray-200">Revenue Trend</CardTitle>
                <CardDescription className="text-gray-500">
                    Monthly revenue growth over the past year.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#EAB308" stopOpacity={0} />
                                </linearGradient>
                            </defs>
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
                                contentStyle={{ backgroundColor: '#1E1E2D', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#EAB308' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#EAB308"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
