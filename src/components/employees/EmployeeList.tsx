import { Employee } from "@/types/employee";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Phone, Mail, FileText, Calendar } from "lucide-react";

interface EmployeeListProps {
    employees: Employee[];
    viewMode: "table" | "card";
    onEmployeeClick: (employee: Employee) => void;
}

const EmployeeList = ({ employees, viewMode, onEmployeeClick }: EmployeeListProps) => {
    const getLicenseStatusColor = (status: string) => {
        switch (status) {
            case "valid":
                return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
            case "expiring":
                return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
            case "expired":
                return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    const getStatusDotColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-500";
            case "inactive":
                return "bg-gray-400";
            case "on_leave":
                return "bg-blue-500";
            case "blocked":
                return "bg-red-500";
            default:
                return "bg-gray-400";
        }
    };

    if (viewMode === "table") {
        return (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b border-border">
                        <tr>
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground w-12"></th>
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Name</th>
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Position</th>
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">License Status</th>
                            <th className="py-3 px-4 text-left font-medium text-muted-foreground">Assignments</th>
                            <th className="py-3 px-4 text-right font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => {
                            const mainLicense = employee.licenses[0];
                            return (
                                <tr
                                    key={employee.id}
                                    className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                                    onClick={() => onEmployeeClick(employee)}
                                >
                                    <td className="py-3 px-4">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={employee.photoUrl} />
                                            <AvatarFallback>{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
                                        </Avatar>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground">
                                                {employee.firstName} {employee.lastName}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{employee.email}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-muted-foreground">{employee.position}</td>
                                    <td className="py-3 px-4">
                                        {mainLicense ? (
                                            <div className="flex flex-col gap-1">
                                                <Badge variant="outline" className={`${getLicenseStatusColor(mainLicense.status)} border`}>
                                                    {mainLicense.status === "valid" && "🟢 Valid"}
                                                    {mainLicense.status === "expiring" && "🟡 Expiring"}
                                                    {mainLicense.status === "expired" && "🔴 Expired"}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">
                                                    Exp: {new Date(mainLicense.expirationDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground text-xs">No Licenses</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            <span>{employee.shifts.length} shifts</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {employees.map((employee) => (
                <div
                    key={employee.id}
                    className="bg-card border border-border rounded-lg p-5 hover:border-accent/50 transition-colors cursor-pointer group"
                    onClick={() => onEmployeeClick(employee)}
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Avatar className="h-12 w-12 border-2 border-background">
                                    <AvatarImage src={employee.photoUrl} />
                                    <AvatarFallback>{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
                                </Avatar>
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusDotColor(employee.status)}`} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                                    {employee.firstName} {employee.lastName}
                                </h3>
                                <p className="text-sm text-muted-foreground">{employee.position}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="space-y-3 mb-4">
                        <div className="text-sm font-medium text-muted-foreground">Licenses:</div>
                        {employee.licenses.slice(0, 3).map((license) => (
                            <div key={license.id} className="flex items-center justify-between text-sm">
                                <span className="truncate max-w-[140px] text-foreground/80">{license.name}</span>
                                <Badge variant="outline" className={`text-xs px-1.5 py-0 h-5 ${getLicenseStatusColor(license.status)}`}>
                                    {license.status}
                                </Badge>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                        <Button variant="outline" size="sm" className="flex-1 gap-2 text-xs">
                            <Phone className="w-3 h-3" /> Call
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 gap-2 text-xs">
                            <Mail className="w-3 h-3" /> Email
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmployeeList;
