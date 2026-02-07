import { AnalyticsKPIs } from "@/components/analytics/AnalyticsKPIs";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { LaborCostAnalysis } from "@/components/analytics/LaborCostAnalysis";
import { OperationalMetrics } from "@/components/analytics/OperationalMetrics";
import { PredictiveStaffing } from "@/components/analytics/PredictiveStaffing";
import { CustomReports } from "@/components/analytics/CustomReports";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Analytics = () => {
    return (
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
                    <p className="text-muted-foreground">
                        Real-time insights on revenue, staff performance, and compliance.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Download Report
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="staffing">Staffing & Labor</TabsTrigger>
                    <TabsTrigger value="reports">Custom Reports</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <AnalyticsKPIs />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <RevenueChart />
                        <div className="col-span-4 lg:col-span-3">
                            {/* Placeholder for smaller widget or feed if needed, currently 
                                using RevenueChart as wide and LaborCost next to it in logic 
                                but in layout RevenueChart is taking 4/7 cols and we need something 
                                else for 3/7. Let's put LaborCost here if it fits, else Revenue should be full?
                                Re-reading plan: "Middle Row: Charts".
                                Let's make Revenue chart full width or 4/7 and OperationalMetrics 3/7?
                              */}
                            {/* Actually, let's stack them nicely. */}
                        </div>
                    </div>
                    {/* Better Layout Correction */}
                    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                        <RevenueChart />
                        <LaborCostAnalysis />
                    </div>

                    <OperationalMetrics />
                </TabsContent>

                <TabsContent value="staffing" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-1">
                        <PredictiveStaffing />
                        <LaborCostAnalysis />
                    </div>
                </TabsContent>

                <TabsContent value="reports" className="space-y-4">
                    <CustomReports />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Analytics;
