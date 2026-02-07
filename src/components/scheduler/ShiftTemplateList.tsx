import { useDraggable } from "@dnd-kit/core";
import { ShiftTemplate } from "@/types/schedule";
import { Card } from "@/components/ui/card";
import { Clock, MapPin, Shield } from "lucide-react";

// Mock Templates
export const mockTemplates: ShiftTemplate[] = [
    {
        id: "template-1", name: "Morning Gate Check", clientId: "1", locationId: "1",
        startTime: "07:00", endTime: "15:00", durationHours: 8,
        requiredCertifications: ["armed"], positions: 1, defaultPayRate: 22
    },
    {
        id: "template-2", name: "Night Patrol", clientId: "1", locationId: "2",
        startTime: "22:00", endTime: "06:00", durationHours: 8,
        requiredCertifications: ["armed", "driver"], positions: 2, defaultPayRate: 25
    },
    {
        id: "template-3", name: "Standard Lobby", clientId: "2", locationId: "3",
        startTime: "09:00", endTime: "17:00", durationHours: 8,
        requiredCertifications: ["unarmed"], positions: 1, defaultPayRate: 18
    }
];

export const StaticTemplateCard = ({ template }: { template: ShiftTemplate }) => {
    return (
        <Card className="p-3 mb-2 cursor-grab hover:shadow-md transition-shadow dark:bg-[#1E1E2D] border-border/50 group">
            <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-sm group-hover:text-primary transition-colors">{template.name}</span>
            </div>

            <div className="space-y-1">
                <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {template.startTime} - {template.endTime} ({template.durationHours}h)
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                    <Shield className="w-3 h-3 mr-1" />
                    {template.requiredCertifications.join(", ")}
                </div>
            </div>
        </Card>
    );
};

const TemplateCard = ({ template }: { template: ShiftTemplate }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: template.id,
        data: { type: "template", template },
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
        opacity: 0.8,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <StaticTemplateCard template={template} />
        </div>
    );
};

const ShiftTemplateList = () => {
    return (
        <div className="flex flex-col h-full bg-background p-1">
            <div className="mb-2 px-1">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Saved Templates</h3>
            </div>
            <div className="space-y-1">
                {mockTemplates.map(template => (
                    <TemplateCard key={template.id} template={template} />
                ))}
            </div>
        </div>
    );
};

export default ShiftTemplateList;
