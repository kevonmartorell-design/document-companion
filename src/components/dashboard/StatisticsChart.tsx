import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

const data = [
    { time: '7 am', value: 20 },
    { time: '8 am', value: 35 },
    { time: '9 am', value: 25 },
    { time: '10 am', value: 45 },
    { time: '11 am', value: 30 },
    { time: '12 am', value: 55 },
    { time: '1 pm', value: 20 },
    { time: '2 pm', value: 75 },
    { time: '3 pm', value: 50 },
    { time: '4 pm', value: 60 },
    { time: '5 pm', value: 45 },
    { time: '6 pm', value: 55 },
    { time: '7 pm', value: 40 },
    { time: '8 pm', value: 30 },
    { time: '9 pm', value: 45 },
    { time: '10 pm', value: 50 },
];

const StatisticsChart = () => {
    return (
        <div className="bg-[#1E1E2D] rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                    {[
                        { day: '01', name: 'Sat' },
                        { day: '02', name: 'Sun' },
                        { day: '03', name: 'Mon' },
                        { day: '04', name: 'Tue' },
                        { day: '05', name: 'Wed' },
                        { day: '06', name: 'Thu' },
                        { day: '07', name: 'Fri' },
                        { day: '08', name: 'Sat' },
                        { day: '09', name: 'Sun' },
                        { day: '10', name: 'Mon', active: true },
                        { day: '11', name: 'Tue' },
                        { day: '12', name: 'Wed' },
                        { day: '13', name: 'Thu' },
                    ].map((date, i) => (
                        <div
                            key={i}
                            className={`flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-all cursor-pointer ${date.active
                                    ? 'bg-purple-100 text-purple-900 shadow-lg shadow-purple-900/20'
                                    : 'bg-transparent text-gray-500 hover:bg-white/5'
                                }`}
                        >
                            <span className="text-lg font-bold">{date.day}</span>
                            <span className="text-xs font-medium opacity-80">{date.name}</span>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 text-sm font-medium text-gray-400">
                    <button className="text-white">Days</button>
                    <button className="hover:text-white transition-colors">Weeks</button>
                    <button className="hover:text-white transition-colors">Months</button>
                </div>
            </div>

            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="time"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            dy={10}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1E1E2D', borderColor: '#374151', borderRadius: '12px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#818cf8"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                        {/* Dashed line simulation */}
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#fbbf24"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            fillOpacity={0}
                            fill="url(#colorValue2)"
                            data={data.map(d => ({ ...d, value: d.value * 0.7 + 10 }))}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatisticsChart;
