import { useState, useEffect } from "react";
import { scheduleService } from "@/services/scheduleService";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Filter, ChevronLeft, ChevronRight, Download, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import SchedulerWorkbench from "@/components/scheduler/SchedulerWorkbench";
import BudgetTracker from "@/components/scheduler/BudgetTracker";
import { Shift, Assignment } from "@/types/schedule";

const Schedule = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [view, setView] = useState<"day" | "week" | "month" | "timeline">("week");
    const [loading, setLoading] = useState(true);

    // Lifted State
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    useEffect(() => {
        if (date) {
            loadSchedule(date);
        }
    }, [date, view]);

    const loadSchedule = async (selectedDate: Date) => {
        try {
            setLoading(true);
            // Calculate start and end of view based on selectedDate and view type
            // For now, just fetching a broad range or the specific day/week
            // optimizing this would be part of a real polishing phase
            const start = new Date(selectedDate);
            start.setDate(start.getDate() - 7); // Buffer
            const end = new Date(selectedDate);
            end.setDate(end.getDate() + 7); // Buffer

            const data = await scheduleService.getShifts(start, end);

            // Transform Supabase data to Shift type
            const mappedShifts: Shift[] = data.map((s: any) => ({
                id: s.id,
                clientId: s.client_id, // clients join needs handling if not expanded
                locationId: s.location_id,
                start: new Date(s.start_time),
                end: new Date(s.end_time),
                requiredCertifications: s.required_certifications || [],
                positionsNeeded: s.positions_needed,
                positionsFilled: s.positions_filled,
                payRate: s.pay_rate,
                billRate: s.bill_rate,
                status: s.status,
                clientName: s.clients?.name,
                locationName: s.locations?.name
            }));

            setShifts(mappedShifts);

            // Extract assignments from shifts if they are nested, or fetch separately
            // The service currently blindly fetches shifts with joined assignments?
            // Let's assume assignments are part of the shift data or we fetch them
            // For now, let's assume we need to process the assignments from the joined data
            const mappedAssignments: Assignment[] = [];
            data.forEach((s: any) => {
                if (s.assignments) {
                    s.assignments.forEach((a: any) => {
                        mappedAssignments.push({
                            id: a.id,
                            shiftId: a.shift_id,
                            employeeId: a.employee_id,
                            status: a.status,
                            startTime: s.start_time, // derived from shift
                            endTime: s.end_time // derived from shift
                        });
                    });
                }
            });
            setAssignments(mappedAssignments);

        } catch (error) {
            console.error("Failed to load schedule:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full bg-background overflow-hidden relative">

            {/* Main Content: Scheduler Workbench */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">

                {/* Header Controls */}
                <header className="border-b border-border bg-background p-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-muted/50 rounded-lg p-1">
                            {/* Date Controls */}
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"ghost"}
                                        className={cn(
                                            "h-7 justify-start text-left font-normal w-[140px]",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="h-4 w-px bg-border" />

                        <div className="flex bg-muted/50 p-1 rounded-lg">
                            {["Day", "Week", "Month", "Timeline"].map((v) => (
                                <Button
                                    key={v}
                                    variant={view === v.toLowerCase() ? "secondary" : "ghost"}
                                    size="sm"
                                    onClick={() => setView(v.toLowerCase() as any)}
                                    className="h-7 text-xs"
                                >
                                    {v}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Budget Tracker Component */}
                        <BudgetTracker shifts={shifts} assignments={assignments} weeklyBudget={15000} />

                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            Export
                        </Button>
                        <Button size="sm">
                            <Plus className="mr-2 h-4 w-4" />
                            New Shift
                        </Button>
                    </div>
                </header>

                {/* Main Scheduler Area */}
                <div className="flex-1 overflow-auto bg-muted/10 relative p-0">
                    <SchedulerWorkbench
                        shifts={shifts}
                        setShifts={setShifts}
                        assignments={assignments}
                        setAssignments={setAssignments}
                    />
                </div>

            </div>
        </div>
    );
};

export default Schedule;
