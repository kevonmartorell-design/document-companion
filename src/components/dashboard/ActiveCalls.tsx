import { Phone, Clock, User, Mic, Database, Globe } from 'lucide-react';

const ActiveCalls = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CallCard
                agent="David Barr"
                client="Sophia Hayes"
                duration="01:54:30"
                calls={34}
                hours="2h 45m"
                active
                id="35774"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
            />
            <CallCard
                agent="Kilian Schönberger"
                client="Owen Darnell"
                duration="01:54:38"
                calls={10}
                hours="3h 10m"
                id="98745"
                image="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80"
            />
            <CallCard
                agent="Jörgen Petersen"
                client="Emma Larkin"
                duration="01:51:43"
                calls={29}
                hours="6h 29m"
                id="85427"
                image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
            />
        </div>
    );
};

interface CallCardProps {
    agent: string;
    client: string;
    duration: string;
    calls: number;
    hours: string;
    active?: boolean;
    id: string;
    image: string;
}

const CallCard = ({ agent, client, duration, calls, hours, active, id, image }: CallCardProps) => {
    return (
        <div className="bg-[#151521] rounded-3xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700">
                    <img src={image} alt={client} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="text-white font-bold text-lg">{client}</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            {duration}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2 text-green-500">
                    <Phone size={16} className="fill-current" />
                    <span className="font-bold">{calls}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                    <Clock size={16} />
                    <span className="font-medium">{hours}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
                <User size={16} className="text-gray-500" />
                <span className="text-gray-300 text-sm font-medium">{agent}</span>
                {active && (
                    <span className="ml-auto w-5 h-5 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold">2</span>
                )}
            </div>

            <div className="mb-6">
                <div className="flex gap-1 mb-1">
                    {[...Array(15)].map((_, i) => (
                        <div key={`t-${i}`} className={`w-1.5 h-1.5 rounded-full ${i < 8 ? 'bg-[#6366f1]' : 'bg-gray-700'}`} />
                    ))}
                </div>
                <div className="flex gap-1">
                    {[...Array(15)].map((_, i) => (
                        <div key={`b-${i}`} className={`w-1.5 h-1.5 rounded-full ${i < 4 ? 'bg-[#fbbf24]' : i === 4 ? 'bg-[#fbbf24]' : 'bg-gray-700'}`} />
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-800 text-xs text-gray-500">
                <span className="font-mono">ID {id}</span>
                <div className="flex gap-3">
                    <Database size={14} />
                    <Globe size={14} />
                </div>
            </div>
        </div>
    );
}

export default ActiveCalls;
