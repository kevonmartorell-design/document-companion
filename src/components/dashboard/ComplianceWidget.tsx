import { ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

const ComplianceWidget = () => {
    return (
        <div className="bg-[#1E1E2D] p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                        <ShieldCheck size={20} />
                    </div>
                    <h3 className="text-white font-bold text-lg">Compliance</h3>
                </div>
                <span className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-2 py-1 rounded-full border border-emerald-500/20">
                    94% Secure
                </span>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-1 shrink-0" />
                    <div>
                        <p className="text-sm text-white font-medium">GDPR Audit Passed</p>
                        <p className="text-xs text-gray-500">Last checked: 2 days ago</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <AlertTriangle size={18} className="text-amber-500 mt-1 shrink-0" />
                    <div>
                        <p className="text-sm text-white font-medium">2 Certifications Expiring</p>
                        <p className="text-xs text-gray-500">Action required for Staff ID #92</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
                <span>Next Audit</span>
                <span className="text-white">Mar 15, 2026</span>
            </div>
        </div>
    );
};

export default ComplianceWidget;
