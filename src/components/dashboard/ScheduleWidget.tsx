import { Calendar, Clock, MoreHorizontal } from 'lucide-react';

const ScheduleWidget = () => {
    const shifts = [
        { day: 'Today', time: '09:00 - 17:00', role: 'Support Shift', staff: 'Liam G.' },
        { day: 'Tomorrow', time: '10:00 - 18:00', role: 'Review Block', staff: 'Mia J.' },
        { day: 'Wed', time: '09:00 - 13:00', role: 'Training', staff: 'All Staff' },
    ];

    return (
        <div className="bg-[#1E1E2D] p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                        <Calendar size={20} />
                    </div>
                    <h3 className="text-white font-bold text-lg">Schedule</h3>
                </div>
                <button className="text-gray-500 hover:text-white">
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className="space-y-4">
                {shifts.map((shift, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#151521] rounded-xl border border-gray-800/50 hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="flex flex-col items-center justify-center w-10 h-10 bg-gray-800 rounded-lg text-xs font-bold text-gray-400">
                                <span>{shift.day.substring(0, 3)}</span>
                            </div>
                            <div>
                                <div className="text-white font-medium text-sm">{shift.role}</div>
                                <div className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                                    <Clock size={10} />
                                    {shift.time}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-indigo-400 text-xs font-medium">{shift.staff}</div>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-4 py-2 text-sm text-gray-400 hover:text-white transition-colors border border-gray-800 rounded-xl hover:bg-gray-800">
                View Full Calendar
            </button>
        </div>
    );
};

export default ScheduleWidget;
