import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface AddEmployeeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddEmployeeModal = ({ isOpen, onClose }: AddEmployeeModalProps) => {
    const [step, setStep] = useState(1);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Employee - Step {step} of 3</DialogTitle>
                </DialogHeader>

                <div className="py-4">
                    {/* STEP 1: BASIC INFO */}
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name *</Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name *</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input id="email" type="email" placeholder="john.doe@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone *</Label>
                                <Input id="phone" placeholder="(555) 123-4567" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Main St" />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">ZIP</Label>
                                    <Input id="zip" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: EMPLOYMENT DETAILS */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Position/Role *</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select position" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="armed">Armed Security Guard</SelectItem>
                                        <SelectItem value="unarmed">Unarmed Security Guard</SelectItem>
                                        <SelectItem value="supervisor">Supervisor</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Department</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="field">Field Operations</SelectItem>
                                        <SelectItem value="admin">Administration</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Hire Date *</Label>
                                    <Input type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Pay Rate ($/hr)</Label>
                                    <Input type="number" placeholder="0.00" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Employment Type</Label>
                                <div className="flex gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="full-time" />
                                        <Label htmlFor="full-time">Full-time</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="part-time" />
                                        <Label htmlFor="part-time">Part-time</Label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: LICENSES */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="border border-border rounded-lg p-4 bg-muted/30">
                                <h4 className="font-semibold mb-3">Armed Security Guard License</h4>
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        <Label>License Number</Label>
                                        <Input placeholder="ASG-XXXXX" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Issue Date</Label>
                                            <Input type="date" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Expiration Date</Label>
                                            <Input type="date" />
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full">Upload Document</Button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="welcome-email" defaultChecked />
                                <Label htmlFor="welcome-email">Send welcome email to employee</Label>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    {step > 1 && (
                        <Button variant="outline" onClick={handleBack}>
                            Back
                        </Button>
                    )}
                    {step < 3 ? (
                        <Button onClick={handleNext}>Continue</Button>
                    ) : (
                        <Button onClick={onClose}>Add Employee</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddEmployeeModal;
