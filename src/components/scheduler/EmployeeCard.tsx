import { useDraggable } from "@dnd-kit/core";
import { Employee } from "@/types/employee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, ShieldAlert, BadgeInfo } from "lucide-react";

interface EmployeeCardProps {
    employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: employee.id,
        data: { type: "employee", employee },
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
        opacity: 0.8,
    } : undefined;

    // determine license status
    const hasArmedLicense = employee.licenses.some(l => l.name.toLowerCase().includes("armed") && l.status === "valid");
    const hasExpiringLicense = employee.licenses.some(l => l.status === "expiring");

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="p-3 mb-2 cursor-grab hover:shadow-md transition-shadow dark:bg-[#1E1E2D] border-border/50"
        >
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={employee.photoUrl} />
                    <AvatarFallback>{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm truncate">
                            {employee.firstName} {employee.lastName}
                        </h4>
                        {hasExpiringLicense && (
                            <ShieldAlert className="w-3 h-3 text-yellow-500" />
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span className="truncate">{employee.position}</span>
                    </div>

                    <div className="flex gap-1 mt-1">
                        {hasArmedLicense && (
                            <Badge variant="secondary" className="h-4 px-1 text-[10px] bg-blue-500/10 text-blue-500 border-blue-500/20">
                                Armed
                            </Badge>
                        )}
                        <Badge variant="outline" className="h-4 px-1 text-[10px]">
                            {employee.rating} ★
                        </Badge>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default EmployeeCard;
