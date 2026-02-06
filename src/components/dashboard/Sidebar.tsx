import { Home, BarChart2, Users, Layers, Phone, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
    return (
        <div className="h-screen w-20 bg-[#1E1E2D] flex flex-col items-center py-6 border-r border-gray-800">
            <div className="mb-10">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">N</span>
                </div>
            </div>

            <nav className="flex-1 flex flex-col gap-6 w-full items-center">
                <NavItem icon={<Home size={24} />} active />
                <NavItem icon={<BarChart2 size={24} />} />
                <NavItem icon={<Users size={24} />} />
                <NavItem icon={<Layers size={24} />} />
                <NavItem icon={<Phone size={24} />} badge="2" />
            </nav>

            <div className="mt-auto flex flex-col gap-6 w-full items-center">
                <NavItem icon={<Settings size={24} />} />
                <NavItem icon={<LogOut size={24} />} />
            </div>
        </div>
    );
};

const NavItem = ({ icon, active = false, badge }: { icon: React.ReactNode; active?: boolean; badge?: string }) => {
    return (
        <button
            className={`relative p-3 rounded-xl transition-all duration-200 group ${active
                    ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            {icon}
            {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full" />
            )}
            {badge && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-[#1E1E2D]">
                    {badge}
                </span>
            )}
        </button>
    );
};

export default Sidebar;
