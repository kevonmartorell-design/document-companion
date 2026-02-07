import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SchedulingConflict } from "@/utils/schedulerUtils";
import { AlertTriangle, Ban } from "lucide-react";

interface ShiftValidationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    conflicts: SchedulingConflict[];
}

const ShiftValidationModal = ({ isOpen, onClose, onConfirm, conflicts }: ShiftValidationModalProps) => {
    const hasHardBlock = conflicts.some(c => c.type === "hard");

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        {hasHardBlock ? (
                            <>
                                <Ban className="h-5 w-5 text-destructive" />
                                <span className="text-destructive">Assignment Blocked</span>
                            </>
                        ) : (
                            <>
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                <span className="text-yellow-500">Assignment Warning</span>
                            </>
                        )}
                    </AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <div className="space-y-3 pt-2">
                            <p>
                                {hasHardBlock
                                    ? "This assignment cannot be completed due to the following restriction(s):"
                                    : "There are potential issues with this assignment:"
                                }
                            </p>
                            <ul className="space-y-2 text-sm bg-muted/50 p-3 rounded-lg">
                                {conflicts.map((conflict, index) => (
                                    <li key={index} className="flex gap-2 items-start">
                                        <span className={`mt-0.5 h-1.5 w-1.5 rounded-full flex-shrink-0 ${conflict.type === 'hard' ? 'bg-destructive' : 'bg-yellow-500'}`} />
                                        <span className={conflict.type === 'hard' ? 'font-semibold text-destructive' : 'text-foreground'}>
                                            {conflict.reason}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            {!hasHardBlock && (
                                <p className="text-xs text-muted-foreground mt-2">
                                    Do you want to proceed with this assignment anyway?
                                </p>
                            )}
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    {!hasHardBlock && (
                        <AlertDialogAction onClick={onConfirm} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                            Confirm Assignment
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ShiftValidationModal;
