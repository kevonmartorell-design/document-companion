import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FileDown, Plus } from "lucide-react";

export function CustomReports() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>Create detailed reports by mixing and matching metrics.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Metric</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Metric" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="revenue">Revenue</SelectItem>
                                    <SelectItem value="hours">Hours Worked</SelectItem>
                                    <SelectItem value="incident">Incidents</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Dimension</label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Group By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="employee">Employee</SelectItem>
                                    <SelectItem value="client">Client</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date Range</label>
                            <div className="flex gap-2">
                                <Input type="date" className="w-full" />
                                <Input type="date" className="w-full" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                        <Button variant="outline" size="sm">
                            <Plus className="mr-2 h-4 w-4" /> Add Filter
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="secondary">
                                Preview
                            </Button>
                            <Button>
                                <FileDown className="mr-2 h-4 w-4" /> Export Report
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
