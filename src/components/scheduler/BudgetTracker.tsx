import { Shift, Assignment } from "@/types/schedule";
import { differenceInHours } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BudgetTrackerProps {
    shifts: Shift[];
    assignments: Assignment[]; // In a real app, use assignments to get actual hours
    weeklyBudget: number;
}

const BudgetTracker = ({ shifts, weeklyBudget }: BudgetTrackerProps) => {
    // Calculate total estimated cost based on shift duration and pay rate
    const totalCost = shifts.reduce((total, shift) => {
        const duration = differenceInHours(shift.end, shift.start);
        return total + (duration * shift.payRate);
    }, 0);

    const percentUsed = Math.min(100, Math.round((totalCost / weeklyBudget) * 100));
    const isOverBudget = totalCost > weeklyBudget;

    return (
        <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-lg border border-border/50">
            <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> Labor Budget
                </span>
                <div className={`text-sm font-bold flex items-center gap-2 ${isOverBudget ? "text-destructive" : "text-green-500"}`}>
                    ${totalCost.toLocaleString()}
                    <span className="text-muted-foreground font-normal text-xs">/ ${weeklyBudget.toLocaleString()}</span>
                </div>
            </div>

            <div className="w-32 flex flex-col gap-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>{percentUsed}% Used</span>
                    {isOverBudget && <span className="text-destructive font-bold flex items-center"><AlertCircle className="w-3 h-3 mr-0.5" /> OVER</span>}
                </div>
                <Progress value={percentUsed} className={`h-2 ${isOverBudget ? "bg-destructive/20" : ""}`} indicatorClassName={isOverBudget ? "bg-destructive" : "bg-green-500"} />
            </div>
        </div>
    );
};

export default BudgetTracker;
