import { useState, useEffect } from 'react';
import { Calendar, Clock, MoreHorizontal } from 'lucide-react';
import { scheduleService } from '@/services/scheduleService';
import { format, isToday, isTomorrow } from 'date-fns';

const ScheduleWidget = () => {
    const [shifts, setShifts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadShifts();
    }, []);

    const loadShifts = async () => {
        try {
            setLoading(true);
            const start = new Date();
            const end = new Date();
            end.setDate(end.getDate() + 7); // Next 7 days

            const data = await scheduleService.getShifts(start, end);

            // Transform for widget display
            const widgetShifts = data.slice(0, 3).map((s: any) => {
                let dayLabel = format(new Date(s.start_time), 'EEE');
                if (isToday(new Date(s.start_time))) dayLabel = 'Today';
                if (isTomorrow(new Date(s.start_time))) dayLabel = 'Tomorrow';

                return {
                    day: dayLabel,
                    time: `${format(new Date(s.start_time), 'HH:mm')} - ${format(new Date(s.end_time), 'HH:mm')}`,
                    role: s.locations?.name || 'Shift', // Use location or position
                    staff: s.positions_filled + '/' + s.positions_needed + ' Filled'
                };
            });
            setShifts(widgetShifts);
        } catch (error) {
            console.error("Failed to load widget shifts:", error);
        } finally {
            setLoading(false);
        }
    };


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
                {loading ? (
                    <div className="text-gray-500 text-sm text-center py-4">Loading schedule...</div>
                ) : shifts.length === 0 ? (
                    <div className="text-gray-500 text-sm text-center py-4">No upcoming shifts.</div>
                ) : (
                    shifts.map((shift, i) => (
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
                    ))
                )}
            </div>

            <button className="w-full mt-4 py-2 text-sm text-gray-400 hover:text-white transition-colors border border-gray-800 rounded-xl hover:bg-gray-800">
                View Full Calendar
            </button>
        </div>
    );
};

export default ScheduleWidget;
