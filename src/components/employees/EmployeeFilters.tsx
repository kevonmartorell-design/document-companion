import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface EmployeeFiltersProps {
    filters: any;
    setFilters: (filters: any) => void;
}

const EmployeeFilters = ({ filters, setFilters }: EmployeeFiltersProps) => {
    return (
        <div className="w-64 flex-shrink-0 border-r border-border bg-card p-4 hidden lg:block h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Clear All
                </Button>
            </div>

            <div className="space-y-6">
                {/* Status Filter */}
                <div>
                    <h4 className="text-sm font-medium mb-3">Status</h4>
                    <div className="space-y-2">
                        {["Active", "Inactive", "On Leave"].map((status) => (
                            <div key={status} className="flex items-center space-x-2">
                                <Checkbox id={`status-${status}`} />
                                <Label htmlFor={`status-${status}`} className="text-sm font-normal">
                                    {status}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* License Status Filter */}
                <div>
                    <h4 className="text-sm font-medium mb-3">License Status</h4>
                    <div className="space-y-2">
                        {["Valid", "Expiring Soon", "Expired"].map((status) => (
                            <div key={status} className="flex items-center space-x-2">
                                <Checkbox id={`license-${status}`} />
                                <Label htmlFor={`license-${status}`} className="text-sm font-normal">
                                    {status}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Position Filter */}
                <div>
                    <h4 className="text-sm font-medium mb-3">Position</h4>
                    <div className="space-y-2">
                        {["Armed Security", "Unarmed Security", "Supervisor"].map((pos) => (
                            <div key={pos} className="flex items-center space-x-2">
                                <Checkbox id={`pos-${pos}`} />
                                <Label htmlFor={`pos-${pos}`} className="text-sm font-normal">
                                    {pos}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Skills Filter */}
                <div>
                    <h4 className="text-sm font-medium mb-3">Skills</h4>
                    <div className="space-y-2">
                        {["First Aid", "CPR", "Bilingual", "K9 Handling"].map((skill) => (
                            <div key={skill} className="flex items-center space-x-2">
                                <Checkbox id={`skill-${skill}`} />
                                <Label htmlFor={`skill-${skill}`} className="text-sm font-normal">
                                    {skill}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeFilters;
