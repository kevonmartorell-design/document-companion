import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Employee } from "@/types/employee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Calendar, Briefcase, FileText } from "lucide-react";

interface EmployeeDetailModalProps {
    employee: Employee;
    isOpen: boolean;
    onClose: () => void;
}

const EmployeeDetailModal = ({ employee, isOpen, onClose }: EmployeeDetailModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={employee.photoUrl} />
                            <AvatarFallback>{employee.firstName[0]}{employee.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <DialogTitle className="text-2xl font-bold">
                                {employee.firstName} {employee.lastName}
                            </DialogTitle>
                            <p className="text-muted-foreground">{employee.position} • {employee.department}</p>
                            <div className="flex gap-2 mt-2">
                                <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                                    {employee.status.toUpperCase()}
                                </Badge>
                                <Badge variant="outline">ID: {employee.id}</Badge>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                <Tabs defaultValue="profile" className="mt-6">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="licenses">Licenses</TabsTrigger>
                        <TabsTrigger value="schedule">Schedule</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium">Contact Info</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <span>{employee.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <span>{employee.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-4 h-4 text-muted-foreground" />
                                        <span>123 Main St, Los Angeles, CA</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm font-medium">Employment Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <span>Hired: {new Date(employee.hireDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="w-4 h-4 text-muted-foreground" />
                                        <span>Full-Time</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-lg">$25.00</span>
                                        <span className="text-muted-foreground">/ hour</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="licenses" className="space-y-4 mt-4">
                        {employee.licenses.map((license) => (
                            <Card key={license.id}>
                                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`w-3 h-3 mt-1.5 rounded-full ${license.status === "valid"
                                                ? "bg-green-500"
                                                : license.status === "expiring"
                                                    ? "bg-yellow-500"
                                                    : "bg-red-500"
                                                }`}
                                        />
                                        <div>
                                            <h4 className="font-semibold">{license.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                License #: {license.number}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Issued: {new Date(license.issuedDate).toLocaleDateString()} | Expires:{" "}
                                                {new Date(license.expirationDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            View Document
                                        </Button>
                                        <Button size="sm">Update</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button className="w-full" variant="outline">
                            + Add New License
                        </Button>
                    </TabsContent>

                    {/* Detailed content for Schedule, Documents, Performance */}
                    <TabsContent value="schedule" className="space-y-4 mt-4">
                        <h3 className="font-semibold mb-2">Upcoming Shifts</h3>
                        <div className="space-y-2">
                            {employee.shifts.map((shift) => (
                                <div key={shift.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium text-sm">{shift.date} • {shift.time}</p>
                                            <p className="text-xs text-muted-foreground">{shift.location} ({shift.client})</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline">{shift.status}</Badge>
                                </div>
                            ))}
                            {employee.shifts.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">No upcoming shifts assigned.</p>
                            )}
                        </div>
                        <Button className="w-full" variant="outline">
                            + Assign to Shift
                        </Button>
                    </TabsContent>

                    <TabsContent value="documents" className="space-y-4 mt-4">
                        <h3 className="font-semibold mb-2">Uploaded Documents</h3>
                        <div className="space-y-2">
                            {employee.documents.map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-blue-500" />
                                        <div>
                                            <p className="font-medium text-sm">{doc.name}</p>
                                            <p className="text-xs text-muted-foreground">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm">Download</Button>
                                </div>
                            ))}
                            {employee.documents.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">No documents found.</p>
                            )}
                        </div>
                        <Button className="w-full" variant="outline">
                            + Upload Document
                        </Button>
                    </TabsContent>

                    <TabsContent value="performance" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Overall Rating</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{employee.rating} / 5.0</div>
                                    <p className="text-xs text-muted-foreground">Based on 23 client reviews</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">98.5%</div>
                                    <p className="text-xs text-muted-foreground">On-time check-ins</p>
                                </CardContent>
                            </Card>
                        </div>

                        <h3 className="font-semibold mt-4 mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {employee.skills.map(skill => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default EmployeeDetailModal;
