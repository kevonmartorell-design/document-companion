import { Search, Bell } from 'lucide-react';

const TopBar = () => {
    return (
        <div className="h-20 px-8 flex items-center justify-between border-b border-gray-800 bg-[#151521]">
            <div className="flex items-center gap-12">
                <h1 className="text-2xl font-bold text-white tracking-tight">Statistics</h1>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-[#1E1E2D] border-none rounded-full py-2.5 pl-10 pr-4 text-gray-300 w-64 focus:ring-2 focus:ring-indigo-500/50 outline-none"
                    />
                </div>

                <div className="flex items-center gap-3 bg-[#1E1E2D] rounded-full p-1 pr-4">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#1E1E2D]" />
                        ))}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-[#1E1E2D] flex items-center justify-center text-[10px] font-bold text-white">
                            +12
                        </div>
                    </div>
                    <div className="text-sm font-medium text-gray-300">
                        <span className="text-white font-bold">12 of 15</span> on work
                    </div>
                </div>

                <div className="bg-[#1E1E2D] rounded-full px-4 py-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium text-white">2 <span className="text-gray-400 font-normal">on break</span></span>
                </div>

                <div className="flex items-center gap-3 pl-6 border-l border-gray-800">
                    <div className="text-right">
                        <div className="text-sm font-bold text-white">James Radcliffe</div>
                        <div className="text-xs text-indigo-400">Admin</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-indigo-500/30">
                        <img src="https://github.com/shadcn.png" alt="Admin" className="w-full h-full rounded-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
