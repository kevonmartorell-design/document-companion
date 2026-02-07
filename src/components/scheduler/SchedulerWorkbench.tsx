import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import EmployeePool from "./EmployeePool";
import EmployeeCard from "./EmployeeCard";
import { Employee } from "@/types/employee";
import TimelineView from "./TimelineView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShiftTemplateList, { StaticTemplateCard } from "./ShiftTemplateList";
import { toast } from "sonner";
import { format } from "date-fns";
import { checkConflicts, SchedulingConflict, getRecommendedEmployees, EmployeeMatch } from "@/utils/schedulerUtils";
import ShiftValidationModal from "./ShiftValidationModal";
import SmartAssignModal from "./SmartAssignModal";
import { Shift, Assignment } from "@/types/schedule";
import { mockEmployees } from "@/data/mockEmployees";

const SchedulerWorkbench = ({
    shifts,
    setShifts,
    assignments,
    setAssignments
}: {
    shifts: Shift[],
    setShifts: React.Dispatch<React.SetStateAction<Shift[]>>,
    assignments: Assignment[],
    setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>
}) => {
    const [activeDragItem, setActiveDragItem] = useState<{ type: 'employee' | 'template', data: any } | null>(null);
    const [validationState, setValidationState] = useState<{
        isOpen: boolean;
        conflicts: SchedulingConflict[];
        pendingAssignment: { employee: Employee; shiftId: string; date: Date } | null;
    }>({ isOpen: false, conflicts: [], pendingAssignment: null });

    const [smartAssignState, setSmartAssignState] = useState<{
        isOpen: boolean;
        shiftId: string | null;
        recommendations: EmployeeMatch[];
    }>({ isOpen: false, shiftId: null, recommendations: [] });

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = (event: any) => {
        const { current } = event.active.data;
        if (current?.type === "employee") {
            setActiveDragItem({ type: 'employee', data: current.employee });
        } else if (current?.type === "template") {
            setActiveDragItem({ type: 'template', data: current.template });
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveDragItem(null);

        if (!over) return;

        // Handle Employee Assignment
        if (active.data.current?.type === "employee" && over.data.current?.type === "shift") {
            const employee = active.data.current?.employee as Employee;
            const shiftId = over.id;
            const shiftDate = over.data.current?.date;

            const targetShift = shifts.find(s => s.id === shiftId) || {
                ...shifts[0],
                start: shiftDate,
                end: new Date(new Date(shiftDate).getTime() + 8 * 60 * 60 * 1000)
            };

            const conflicts = checkConflicts(employee, targetShift, assignments, shifts);

            if (conflicts.length > 0) {
                setValidationState({
                    isOpen: true,
                    conflicts,
                    pendingAssignment: { employee, shiftId: shiftId as string, date: shiftDate }
                });
            } else {
                completeAssignment(employee, shiftDate);
            }
        }

        // Handle Template Drop (Create Shift)
        if (active.data.current?.type === "template" && over.data.current?.type === "day") {
            const template = active.data.current.template;
            const date = over.data.current.date;

            // Create new shift from template
            const newShift: Shift = {
                id: `shift-${Date.now()}`,
                clientId: template.clientId,
                locationId: template.locationId,
                start: new Date(date.setHours(parseInt(template.startTime.split(':')[0]), 0, 0, 0)),
                end: new Date(date.setHours(parseInt(template.endTime.split(':')[0]), 0, 0, 0)),
                requiredCertifications: template.requiredCertifications,
                positionsNeeded: template.positions,
                positionsFilled: 0,
                payRate: template.defaultPayRate || 20,
                billRate: (template.defaultPayRate || 20) * 1.5,
                status: 'open'
            };

            setShifts(prev => [...prev, newShift]);

            toast.success(`Created "${template.name}" Shift`, {
                description: `Scheduled for ${format(date, "EEEE, MMMM d")}`
            });
        }
    };

    const handleSmartAssignClick = (shiftId: string) => {
        const targetShift = shifts.find(s => s.id === shiftId);
        if (!targetShift) return;

        const employees = mockEmployees as unknown as Employee[];

        const recommendations = getRecommendedEmployees(targetShift, employees, assignments, shifts);
        setSmartAssignState({
            isOpen: true,
            shiftId,
            recommendations
        });
    };

    const handleSmartAssignConfirm = (employeeId: string) => {
        const employee = (mockEmployees as unknown as Employee[]).find(e => e.id === employeeId);
        if (employee && smartAssignState.shiftId) {
            const shift = shifts.find(s => s.id === smartAssignState.shiftId);
            completeAssignment(employee, shift?.start || new Date());
            setSmartAssignState(prev => ({ ...prev, isOpen: false }));
        }
    };

    const completeAssignment = (employee: Employee, date: Date) => {
        toast.success(`Assigned ${employee.firstName} to shift on ${format(new Date(date), "MMM d")}`, {
            description: "Assignment confirmed."
        });
        setValidationState({ isOpen: false, conflicts: [], pendingAssignment: null });
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex h-full">
                {/* Sidebar (Tabs: Pool & Templates) */}
                <div className="w-80 border-r border-border bg-card flex flex-col z-20 shadow-xl">
                    <Tabs defaultValue="pool" className="flex flex-col h-full w-full">
                        <div className="p-2 border-b border-border bg-card">
                            <TabsList className="w-full grid grid-cols-2">
                                <TabsTrigger value="pool">Staff Pool</TabsTrigger>
                                <TabsTrigger value="templates">Templates</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="pool" className="flex-1 overflow-hidden flex flex-col m-0 p-0 border-none outline-none data-[state=active]:flex">
                            <div className="flex-1 overflow-y-auto p-4 bg-background/50">
                                <EmployeePool />
                            </div>
                        </TabsContent>

                        <TabsContent value="templates" className="flex-1 overflow-hidden flex flex-col m-0 p-0 border-none outline-none data-[state=active]:flex">
                            <div className="flex-1 overflow-y-auto p-4 bg-background/50">
                                <ShiftTemplateList />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Main Scheduler Area (Droppable Targets) */}
                <div className="flex-1 overflow-auto bg-muted/10 relative">
                    <TimelineView onSmartAssign={handleSmartAssignClick} />
                </div>
            </div>

            {/* Drag Overlay for smooth visual feedback */}
            <DragOverlay>
                {activeDragItem?.type === 'employee' && (
                    <div className="opacity-90 rotate-3 cursor-grabbing">
                        <EmployeeCard employee={activeDragItem.data} />
                    </div>
                )}
                {activeDragItem?.type === 'template' && (
                    <div className="opacity-90 rotate-3 cursor-grabbing w-72">
                        <StaticTemplateCard template={activeDragItem.data} />
                    </div>
                )}
            </DragOverlay>

            <ShiftValidationModal
                isOpen={validationState.isOpen}
                onClose={() => setValidationState(prev => ({ ...prev, isOpen: false }))}
                onConfirm={() => {
                    if (validationState.pendingAssignment) {
                        completeAssignment(validationState.pendingAssignment.employee, validationState.pendingAssignment.date);
                    }
                }}
                conflicts={validationState.conflicts}
            />

            <SmartAssignModal
                isOpen={smartAssignState.isOpen}
                onClose={() => setSmartAssignState(prev => ({ ...prev, isOpen: false }))}
                onAssign={handleSmartAssignConfirm}
                recommendations={smartAssignState.recommendations}
            />
        </DndContext>
    );
};

export default SchedulerWorkbench;
