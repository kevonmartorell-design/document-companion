import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, CheckSquare, Download } from "lucide-react";

const frameworks = {
    OSHA: [
        { id: "o1", label: "Hazard Communication Program implemented", checked: true },
        { id: "o2", label: "Emergency Action Plan posted", checked: true },
        { id: "o3", label: "Fire Prevention Plan updated", checked: false },
        { id: "o4", label: "PPE Assessment completed", checked: false },
        { id: "o5", label: "OSHA 300 Logs maintained", checked: true },
    ],
    HIPAA: [
        { id: "h1", label: "Privacy Officer appointed", checked: true },
        { id: "h2", label: "Notice of Privacy Practices distributed", checked: true },
        { id: "h3", label: "Business Associate Agreements (BAAs) signed", checked: false },
        { id: "h4", label: "Risk Analysis completed recently", checked: false },
    ],
    SMB: [
        { id: "s1", label: "Business License valid", checked: true },
        { id: "s2", label: "Insurance Policies active", checked: true },
        { id: "s3", label: "Employee Handbook distributed", checked: true },
        { id: "s4", label: "Labor Law Posters displayed", checked: false },
    ]
};

export const FrameworkTemplates = () => {
    const [selectedFramework, setSelectedFramework] = useState<keyof typeof frameworks>("OSHA");
    const [checklist, setChecklist] = useState(frameworks);

    const toggleCheck = (fw: keyof typeof frameworks, id: string) => {
        setChecklist(prev => ({
            ...prev,
            [fw]: prev[fw].map(item => item.id === id ? { ...item, checked: !item.checked } : item)
        }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[600px]">
            {/* Framework Selector Sidebar */}
            <Card className="md:col-span-1 h-full">
                <CardHeader>
                    <CardTitle>Frameworks</CardTitle>
                    <CardDescription>Select a standard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {(Object.keys(frameworks) as Array<keyof typeof frameworks>).map((fw) => (
                        <Button
                            key={fw}
                            variant={selectedFramework === fw ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setSelectedFramework(fw)}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            {fw} Standard
                        </Button>
                    ))}
                </CardContent>
            </Card>

            {/* Checklist View */}
            <Card className="md:col-span-3 h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>{selectedFramework} Compliance Checklist</CardTitle>
                        <CardDescription>Track requirements for {selectedFramework} compliance.</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full pr-4">
                        <div className="space-y-4">
                            {checklist[selectedFramework].map((item) => (
                                <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                                    <Checkbox
                                        id={item.id}
                                        checked={item.checked}
                                        onCheckedChange={() => toggleCheck(selectedFramework, item.id)}
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            htmlFor={item.id}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            {item.label}
                                        </label>
                                        <p className="text-xs text-muted-foreground">
                                            {item.checked ? "Completed" : "Action Required"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-6 border-t bg-muted/20">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-bold">
                            {Math.round((checklist[selectedFramework].filter(i => i.checked).length / checklist[selectedFramework].length) * 100)}%
                        </span>
                    </div>
                    <Progress
                        value={(checklist[selectedFramework].filter(i => i.checked).length / checklist[selectedFramework].length) * 100}
                        className="h-2 mt-2"
                    />
                </div>
            </Card>
        </div>
    );
};
