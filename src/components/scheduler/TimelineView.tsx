import { useDroppable } from "@dnd-kit/core";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for initial visualization
const mockShifts = [
    { id: "shift-1", date: new Date(), startTime: "09:00", endTime: "17:00", location: "Main Gate", positions: 2, filled: 1 },
    { id: "shift-2", date: new Date(), startTime: "14:00", endTime: "22:00", location: "Patrol Route A", positions: 1, filled: 0 },
    { id: "shift-3", date: addDays(new Date(), 1), startTime: "08:00", endTime: "16:00", location: "Lobby Desk", positions: 1, filled: 1 },
];

const TimelineSlot = ({ shift, onSmartAssign }: { shift: any, onSmartAssign: (id: string) => void }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: shift.id,
        data: { type: "shift", date: shift.date },
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "border rounded-lg p-3 mb-2 transition-colors min-h-[100px] flex flex-col justify-between relative z-10 group",
                isOver ? "bg-primary/10 border-primary border-2" : "bg-card border-border",
                shift.filled >= shift.positions ? "opacity-50" : ""
            )}
        >
            <div>
                <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm">{shift.location}</span>
                    <span className={cn(
                        "text-[10px] px-1.5 py-0.5 rounded-full border",
                        shift.filled === 0 ? "bg-green-500/10 text-green-500 border-green-500/20" :
                            shift.filled < shift.positions ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                "bg-muted text-muted-foreground"
                    )}>
                        {shift.filled}/{shift.positions} Filled
                    </span>
                </div>
                <div className="text-xs text-muted-foreground">
                    {shift.startTime} - {shift.endTime}
                </div>
            </div>

            <div className="flex justify-between items-end mt-2">
                <div className="text-xs text-muted-foreground">
                    {isOver ? "Drop to Assign" : "Drag Guard Here"}
                </div>

                {shift.filled < shift.positions && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Smart Assign"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSmartAssign(shift.id);
                        }}
                    >
                        <Wand2 className="h-3 w-3 text-primary" />
                    </Button>
                )}
            </div>
        </div>
    );
};

const DayColumn = ({ day, children }: { day: Date, children: React.ReactNode }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: `day-${day.toISOString()}`,
        data: { type: "day", date: day },
    });

    return (
        <div
            ref={setNodeRef}
            className={cn(
                "flex flex-col gap-2 rounded-lg transition-colors p-1",
                isOver ? "bg-accent/50 ring-2 ring-primary/20" : ""
            )}
        >
            <div className="text-center p-2 border-b border-border/50 bg-muted/20 rounded-t-lg">
                <div className="font-bold text-sm">{format(day, "EEE")}</div>
                <div className="text-xs text-muted-foreground">{format(day, "MMM d")}</div>
            </div>

            <div className="space-y-2 min-h-[300px]">
                {children}
                {isOver && (
                    <div className="h-24 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center text-xs text-primary bg-primary/5 animate-pulse">
                        Drop to Create Shift
                    </div>
                )}
            </div>
        </div>
    );
};

const TimelineView = ({ onSmartAssign = () => { } }: { onSmartAssign?: (shiftId: string) => void }) => {
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, i) => addDays(today, i));

    return (
        <div className="p-4 grid grid-cols-7 gap-4 min-w-[1000px]">
            {days.map((day) => (
                <DayColumn key={day.toISOString()} day={day}>
                    {mockShifts
                        .filter(s => s.date.getDate() === day.getDate())
                        .map(shift => (
                            <TimelineSlot key={shift.id} shift={shift} onSmartAssign={onSmartAssign} />
                        ))
                    }
                    {/* Empty state placeholder for days with no shifts */}
                    {mockShifts.filter(s => s.date.getDate() === day.getDate()).length === 0 && (
                        <div className="h-24 border border-dashed border-border/50 rounded-lg flex items-center justify-center text-xs text-muted-foreground/50">
                            No Shifts
                        </div>
                    )}
                </DayColumn>
            ))}
        </div>
    );
};

export default TimelineView;
