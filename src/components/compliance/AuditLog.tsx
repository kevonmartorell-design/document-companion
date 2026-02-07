import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock } from "lucide-react";

const auditLogs = [
    { id: 1, action: "Document Uploaded", details: "General Liability Insurance.pdf (v2.0)", user: "Admin User", ip: "192.168.1.10", timestamp: "2024-02-06 14:32:00", hash: "a1b2c3d4..." },
    { id: 2, action: "Training Completed", details: "Market Analysis - Alice Johnson", user: "System", ip: "127.0.0.1", timestamp: "2024-02-06 10:15:22", hash: "e5f6g7h8..." },
    { id: 3, action: "Compliance Alert Resolved", details: "Expired License - Bob Smith", user: "Manager Dave", ip: "10.0.0.5", timestamp: "2024-02-05 16:45:10", hash: "i9j0k1l2..." },
    { id: 4, action: "Framework Checklist Updated", details: "OSHA - Fire Prevention Plan", user: "Admin User", ip: "192.168.1.10", timestamp: "2024-02-05 09:20:05", hash: "m3n4o5p6..." },
    { id: 5, action: "Incident Reported", details: "ID-2024-001 - Safety Hazard", user: "Employee Sarah", ip: "192.168.1.15", timestamp: "2024-02-04 11:10:00", hash: "q7r8s9t0..." },
];

export const AuditLog = () => {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-indigo-500" />
                            Immutable Audit Log
                        </CardTitle>
                        <CardDescription>Complete, tamper-evident history of all compliance actions.</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                        <Shield className="h-3 w-3 mr-1" />
                        Legally Defensible
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Details</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>IP Address</TableHead>
                                <TableHead className="font-mono text-xs">Cryptographic Hash</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auditLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">{log.timestamp}</TableCell>
                                    <TableCell className="font-medium">{log.action}</TableCell>
                                    <TableCell>{log.details}</TableCell>
                                    <TableCell>{log.user}</TableCell>
                                    <TableCell className="text-muted-foreground text-xs">{log.ip}</TableCell>
                                    <TableCell className="font-mono text-[10px] text-muted-foreground truncate max-w-[100px]" title={log.hash}>{log.hash}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};
