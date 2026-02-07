import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

// Import new modular components
import { ComplianceOverview } from "../compliance/ComplianceOverview";
import { FrameworkTemplates } from "../compliance/FrameworkTemplates";
import { DocumentVault } from "../compliance/DocumentVault";
import { TrainingTracker } from "../compliance/TrainingTracker";
import { AuditLog } from "../compliance/AuditLog";
import { IncidentReporting } from "../compliance/IncidentReporting";

const LicenseDashboard = () => {
    const [isExporting, setIsExporting] = useState(false);

    const handleExportAuditPacket = () => {
        setIsExporting(true);
        toast.info("Generating Audit Packet...", {
            description: "Compiling all evidence, logs, and reports into a secure ZIP archive."
        });

        // Simulate API delay
        setTimeout(() => {
            setIsExporting(false);
            toast.success("Audit Packet Ready", {
                description: "Compliance_Audit_2024-02-06.zip has been downloaded.",
                action: {
                    label: "Open",
                    onClick: () => console.log("Opening file"),
                },
            });
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        Compliance Validation Center
                    </h2>
                    <p className="text-muted-foreground">
                        Manage frameworks, track evidence, and ensure audit readiness.
                    </p>
                </div>
                <Button
                    onClick={handleExportAuditPacket}
                    disabled={isExporting}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    <Download className="mr-2 h-4 w-4" />
                    {isExporting ? "Generating..." : "One-Click Audit Export"}
                </Button>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid grid-cols-2 md:grid-cols-6 h-auto">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                    <TabsTrigger value="vault">Evidence Vault</TabsTrigger>
                    <TabsTrigger value="training">Training</TabsTrigger>
                    <TabsTrigger value="incidents">Incidents</TabsTrigger>
                    <TabsTrigger value="audit">Audit Log</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <ComplianceOverview />
                </TabsContent>

                <TabsContent value="frameworks" className="space-y-4">
                    <FrameworkTemplates />
                </TabsContent>

                <TabsContent value="vault" className="space-y-4">
                    <DocumentVault />
                </TabsContent>

                <TabsContent value="training" className="space-y-4">
                    <TrainingTracker />
                </TabsContent>

                <TabsContent value="incidents" className="space-y-4">
                    <IncidentReporting />
                </TabsContent>

                <TabsContent value="audit" className="space-y-4">
                    <AuditLog />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default LicenseDashboard;
