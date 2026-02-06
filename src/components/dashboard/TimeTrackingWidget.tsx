import { Clock, Play, Pause } from 'lucide-react';

const TimeTrackingWidget = () => {
    return (
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-3xl text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-8 bg-white/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="font-bold text-lg">Time Tracker</h3>
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Clock size={20} />
                </div>
            </div>

            <div className="text-center relative z-10 mb-8">
                <div className="text-4xl font-mono font-bold tracking-wider mb-2">04:32:15</div>
                <p className="text-indigo-200 text-sm">Active Session: Project Alpha</p>
            </div>

            <div className="flex items-center gap-3 relative z-10">
                <button className="flex-1 bg-white text-indigo-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                    <Pause size={18} fill="currentColor" />
                    Pause
                </button>
                <button className="flex-1 bg-indigo-900/50 text-white py-3 rounded-xl font-bold hover:bg-indigo-900/70 transition-colors border border-indigo-400/30">
                    Stop
                </button>
            </div>
        </div>
    );
};

export default TimeTrackingWidget;
