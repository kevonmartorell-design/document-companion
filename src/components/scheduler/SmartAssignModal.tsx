import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EmployeeMatch } from "@/utils/schedulerUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, Star, AlertTriangle, XCircle, MapPin } from "lucide-react";

interface SmartAssignModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAssign: (employeeId: string) => void;
    recommendations: EmployeeMatch[];
}

const SmartAssignModal = ({ isOpen, onClose, onAssign, recommendations }: SmartAssignModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        Smart Assign Recommendations
                    </DialogTitle>
                    <DialogDescription>
                        AI-ranked candidates based on certifications, availability, and preferences.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                    {recommendations.map((match) => (
                        <div
                            key={match.employee.id}
                            className={`p-3 rounded-lg border flex items-start gap-3 transition-colors ${match.hasConflicts
                                    ? "bg-destructive/5 border-destructive/20 opacity-70"
                                    : "bg-card border-border hover:border-primary/50"
                                }`}
                        >
                            <Avatar className="h-10 w-10 border-2 border-background">
                                <AvatarImage src={match.employee.photoUrl} />
                                <AvatarFallback>{match.employee.firstName[0]}{match.employee.lastName[0]}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-sm">
                                            {match.employee.firstName} {match.employee.lastName}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                                            <Badge variant="outline" className="text-[10px] h-4 px-1">
                                                {match.employee.position}
                                            </Badge>
                                            <span className="flex items-center">
                                                <Star className="w-3 h-3 mr-0.5 fill-current text-yellow-500" />
                                                {match.employee.rating}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={`font-bold text-lg ${match.score > 80 ? "text-green-500" :
                                            match.score > 50 ? "text-yellow-500" :
                                                "text-red-500"
                                        }`}>
                                        {match.score}%
                                    </div>
                                </div>

                                <div className="mt-2 space-y-1">
                                    {match.reasons.map((reason, idx) => (
                                        <div key={idx} className="text-xs flex items-center gap-1.5 text-muted-foreground bg-muted/30 p-1 rounded">
                                            {reason}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button
                                size="sm"
                                className="self-center ml-2"
                                disabled={match.hasConflicts}
                                onClick={() => onAssign(match.employee.id)}
                            >
                                Assign
                            </Button>
                        </div>
                    ))}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SmartAssignModal;
