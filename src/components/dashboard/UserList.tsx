import { ArrowRight, MoreHorizontal } from 'lucide-react';

interface UserListProps {
    title: string;
    users: Array<{
        name: string;
        status?: string;
        image: string;
        time?: string;
        badgeColor?: string;
    }>;
}

const UserList = ({ title, users }: UserListProps) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <div className="flex flex-col gap-3">
                {users.map((user, idx) => (
                    <div key={idx} className="bg-[#1E1E2D] p-3 rounded-2xl flex items-center gap-4 hover:bg-[#272738] transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
                            <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium text-sm truncate">{user.name}</h3>
                            {user.status && (
                                <p className="text-gray-500 text-xs truncate">{user.status}</p>
                            )}
                        </div>

                        {user.time && (
                            <div className={`px-2 py-1 rounded-lg text-xs font-bold ${user.badgeColor === 'yellow' ? 'bg-[#fbbf24] text-black' :
                                    user.badgeColor === 'purple' ? 'bg-[#6366f1] text-white' :
                                        'bg-gray-700 text-white'
                                }`}>
                                {user.time}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
