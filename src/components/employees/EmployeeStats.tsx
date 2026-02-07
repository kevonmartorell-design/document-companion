import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, AlertTriangle, ShieldCheck } from "lucide-react";

interface EmployeeStatsProps {
    totalEmployees: number;
    activeAssignments: number;
    complianceRate: number;
    validLicenses: number;
    expiringLicenses: number;
    expiredLicenses: number;
}

const EmployeeStats = ({
    totalEmployees,
    activeAssignments,
    complianceRate,
    validLicenses,
    expiringLicenses,
    expiredLicenses,
}: EmployeeStatsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* General Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <Users className="w-6 h-6 text-primary mb-2" />
                        <p className="text-2xl font-bold">{totalEmployees}</p>
                        <p className="text-xs text-muted-foreground">Total Employees</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <UserCheck className="w-6 h-6 text-success mb-2" />
                        <p className="text-2xl font-bold">{activeAssignments}</p>
                        <p className="text-xs text-muted-foreground">Active Assignments</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <UserCheck className="w-6 h-6 text-blue-500 mb-2" />
                        <p className="text-2xl font-bold">18</p>
                        <p className="text-xs text-muted-foreground">On Assignment</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <ShieldCheck className="w-6 h-6 text-purple-500 mb-2" />
                        <p className="text-2xl font-bold">{complianceRate}%</p>
                        <p className="text-xs text-muted-foreground">Compliance Rate</p>
                    </CardContent>
                </Card>
            </div>

            {/* License Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mb-2" />
                        <p className="text-2xl font-bold text-green-700 dark:text-green-400">{validLicenses}</p>
                        <p className="text-xs text-green-600 dark:text-green-300">Valid</p>
                    </CardContent>
                </Card>
                <Card className="bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mb-2" />
                        <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{expiringLicenses}</p>
                        <p className="text-xs text-yellow-600 dark:text-yellow-300">Expiring</p>
                    </CardContent>
                </Card>
                <Card className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mb-2" />
                        <p className="text-2xl font-bold text-red-700 dark:text-red-400">{expiredLicenses}</p>
                        <p className="text-xs text-red-600 dark:text-red-300">Expired</p>
                    </CardContent>
                </Card>
                <Card className="bg-gray-50 dark:bg-gray-900/10">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <AlertTriangle className="w-4 h-4 text-orange-500 mb-2" />
                        <p className="text-2xl font-bold">{expiringLicenses + expiredLicenses}</p>
                        <p className="text-xs text-muted-foreground">Action Req.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EmployeeStats;
