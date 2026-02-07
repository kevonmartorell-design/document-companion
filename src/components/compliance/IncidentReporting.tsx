import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Plus } from "lucide-react";

export const IncidentReporting = () => {
    const [view, setView] = useState<"list" | "report">("list");

    // Mock incidents
    const incidents = [
        { id: "INC-001", title: "Slippery floor in warehouse", type: "Safety Hazard", severity: "Medium", status: "Investigating", date: "2024-02-05" },
        { id: "INC-002", title: "Unreported guest access", type: "Security Breach", severity: "High", status: "Resolved", date: "2024-02-01" },
    ];

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Incident & Issue Reporting</CardTitle>
                    <CardDescription>Report and track workplace incidents anonymously or publicly.</CardDescription>
                </div>
                {view === "list" && (
                    <Button onClick={() => setView("report")}>
                        <Plus className="mr-2 h-4 w-4" /> Report New Incident
                    </Button>
                )}
                {view === "report" && (
                    <Button variant="outline" onClick={() => setView("list")}>
                        Cancel
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {view === "list" ? (
                    <div className="space-y-4">
                        {incidents.map((incident) => (
                            <div key={incident.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className={`mt-1 p-2 rounded-full ${incident.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                        <AlertTriangle className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{incident.title}</h4>
                                        <p className="text-sm text-muted-foreground flex gap-2">
                                            <span>{incident.id}</span>
                                            <span>•</span>
                                            <span>{incident.date}</span>
                                            <span>•</span>
                                            <span>{incident.type}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant={incident.status === 'Resolved' ? 'secondary' : 'default'}>{incident.status}</Badge>
                                    <Button variant="ghost" size="sm">View Details</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <div className="grid gap-2">
                            <Label htmlFor="type">Incident Type</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="safety">Safety Hazard</SelectItem>
                                    <SelectItem value="security">Security Breach</SelectItem>
                                    <SelectItem value="harassment">Harassment</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="severity">Severity Level</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="critical">Critical</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Describe what happened..." className="min-h-[100px]" />
                        </div>

                        <div className="flex items-center gap-2">
                            <Label htmlFor="photos">Evidence/Photos</Label>
                            <Input id="photos" type="file" />
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                            <Button variant="ghost" type="button" onClick={() => setView("list")}>Cancel</Button>
                            <Button type="button">Submit Report</Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
