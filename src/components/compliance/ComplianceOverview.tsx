import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const ComplianceOverview = () => {
    // Mock data for demonstration
    const complianceScore = 87;
    const isAuditReady = false;
    const criticalAlerts = [
        { id: 1, title: "Expired Insurance Policy", desc: "General Liability Policy expired 2 days ago.", type: "critical" },
        { id: 2, title: "Training Overdue", desc: "5 Employees pending 'Workplace Safety' training.", type: "warning" },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Compliance Score Card */}
                <Card className="md:col-span-1">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center p-4">
                            <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-primary/20">
                                <span className="text-4xl font-bold">{complianceScore}%</span>
                                <div
                                    className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent"
                                    style={{ transform: `rotate(${(complianceScore / 100) * 360}deg)` }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Audit Readiness & Stats */}
                <Card className="md:col-span-2">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Audit Readiness</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                {isAuditReady ? (
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                ) : (
                                    <XCircle className="h-8 w-8 text-red-500" />
                                )}
                                <div>
                                    <h3 className="font-semibold text-lg">{isAuditReady ? "Audit Ready" : "Not Audit Ready"}</h3>
                                    <p className="text-sm text-muted-foreground">{isAuditReady ? "All critical documentation is up to date." : "Resolve critical alerts to reach readiness."}</p>
                                </div>
                            </div>
                            <Badge variant={isAuditReady ? "default" : "destructive"} className="text-md px-4 py-1">
                                {isAuditReady ? "READY" : "ACTION REQUIRED"}
                            </Badge>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Documentation</span>
                                <span className="text-green-600 font-medium">95%</span>
                            </div>
                            <Progress value={95} className="h-2" />

                            <div className="flex justify-between text-sm pt-2">
                                <span>Employee Training</span>
                                <span className="text-yellow-600 font-medium">72%</span>
                            </div>
                            <Progress value={72} className="h-2 bg-yellow-100 [&>div]:bg-yellow-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Critical Alerts Section */}
            <h3 className="text-lg font-semibold">Validation Alerts</h3>
            <div className="space-y-3">
                {criticalAlerts.map(alert => (
                    <Alert key={alert.id} variant={alert.type === 'critical' ? 'destructive' : 'default'} className={alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10' : ''}>
                        <AlertTriangle className={`h-4 w-4 ${alert.type === 'warning' ? 'text-yellow-600' : ''}`} />
                        <AlertTitle className={alert.type === 'warning' ? 'text-yellow-800 dark:text-yellow-300' : ''}>{alert.title}</AlertTitle>
                        <AlertDescription className={alert.type === 'warning' ? 'text-yellow-700 dark:text-yellow-400' : ''}>
                            {alert.desc}
                        </AlertDescription>
                    </Alert>
                ))}
                {criticalAlerts.length === 0 && (
                    <Alert className="bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800 dark:text-green-300">All Systems Go</AlertTitle>
                        <AlertDescription className="text-green-700 dark:text-green-400">
                            No critical compliance issues detected.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
};
