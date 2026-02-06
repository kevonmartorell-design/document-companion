import { FileText, Download, HardDrive } from 'lucide-react';

const DocumentsWidget = () => {
    return (
        <div className="bg-[#1E1E2D] p-6 rounded-3xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                        <HardDrive size={20} />
                    </div>
                    <h3 className="text-white font-bold text-lg">Storage</h3>
                </div>
                <span className="text-gray-400 text-xs">85% Used</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-gray-800 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-[85%] rounded-full" />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 hover:bg-[#272738] rounded-xl transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-500/20 text-orange-500 rounded-lg flex items-center justify-center">
                            <FileText size={16} />
                        </div>
                        <div>
                            <div className="text-white text-sm font-medium">Q1 Report.pdf</div>
                            <div className="text-gray-500 text-xs">2.4 MB</div>
                        </div>
                    </div>
                    <Download size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                </div>

                <div className="flex items-center justify-between p-3 hover:bg-[#272738] rounded-xl transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500/20 text-blue-500 rounded-lg flex items-center justify-center">
                            <FileText size={16} />
                        </div>
                        <div>
                            <div className="text-white text-sm font-medium">Contracts_Final.docx</div>
                            <div className="text-gray-500 text-xs">1.8 MB</div>
                        </div>
                    </div>
                    <Download size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                </div>
            </div>
        </div>
    );
};

export default DocumentsWidget;
