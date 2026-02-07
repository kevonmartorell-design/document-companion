import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Mail, Bell } from "lucide-react";

interface TrainingRecord {
    id: number;
    employee: string;
    avatar: string;
    initials: string;
    training: string;
    completedDate: string;
    expiresDate: string;
    status: "Valid" | "Expiring Soon" | "Expired";
}

const mockTrainingData: TrainingRecord[] = [
    { id: 1, employee: "Alice Johnson", avatar: "", initials: "AJ", training: "Workplace Safety 101", completedDate: "2023-05-15", expiresDate: "2024-05-15", status: "Expiring Soon" },
    { id: 2, employee: "Bob Smith", avatar: "", initials: "BS", training: "Anti-Harassment", completedDate: "2024-01-10", expiresDate: "2025-01-10", status: "Valid" },
    { id: 3, employee: "Charlie Davis", avatar: "", initials: "CD", training: "Cybersecurity Awareness", completedDate: "2022-11-20", expiresDate: "2023-11-20", status: "Expired" },
    { id: 4, employee: "Diana Evans", avatar: "", initials: "DE", training: "First Aid & CPR", completedDate: "2023-08-01", expiresDate: "2025-08-01", status: "Valid" },
    { id: 5, employee: "Evan Wright", avatar: "", initials: "EW", training: "HIPAA Compliance", completedDate: "2024-02-01", expiresDate: "2025-02-01", status: "Valid" },
];

export const TrainingTracker = () => {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Training & Certification Tracker</CardTitle>
                    <CardDescription>Monitor employee training completion and renewal deadlines.</CardDescription>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Assign Training
                </Button>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Training Module</TableHead>
                                <TableHead>Completed</TableHead>
                                <TableHead>Expires</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockTrainingData.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={record.avatar} />
                                                <AvatarFallback>{record.initials}</AvatarFallback>
                                            </Avatar>
                                            {record.employee}
                                        </div>
                                    </TableCell>
                                    <TableCell>{record.training}</TableCell>
                                    <TableCell>{record.completedDate}</TableCell>
                                    <TableCell>{record.expiresDate}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            record.status === "Valid" ? "outline" :
                                                record.status === "Expiring Soon" ? "secondary" : "destructive"
                                        } className={
                                            record.status === "Valid" ? "text-green-600 border-green-200 bg-green-50" :
                                                record.status === "Expiring Soon" ? "text-yellow-600 bg-yellow-50" : ""
                                        }>
                                            {record.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" title="Send Reminder">
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="icon" title="View Certificate">
                                                <Bell className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};
