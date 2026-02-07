import { useState, useEffect } from "react";
import { Employee } from "@/types/employee";
import { employeeService } from "@/services/employeeService";
import EmployeeStats from "@/components/employees/EmployeeStats";
import EmployeeFilters from "@/components/employees/EmployeeFilters";
import EmployeeList from "@/components/employees/EmployeeList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    Plus,
    LayoutGrid,
    List,
    Upload,
    Download,
    Filter as FilterIcon,
} from "lucide-react";
import EmployeeDetailModal from "@/components/employees/EmployeeDetailModal";
import AddEmployeeModal from "@/components/employees/AddEmployeeModal";

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"table" | "card">("table");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const data = await employeeService.getEmployees();
            // Transform Supabase data to match UI Employee interface if needed
            // For now, assuming direct mapping or slight transformation
            // We might need to map the raw data to the Employee type expected by the UI
            // This is a placeholder transformation, actual mapping depends on exact type match
            const mappedEmployees: Employee[] = data.map((emp: any) => ({
                id: emp.id,
                firstName: emp.first_name,
                lastName: emp.last_name,
                email: emp.email,
                phone: emp.phone,
                position: "Security Officer", // Default or fetch from role/metadata
                status: emp.status,
                photoUrl: emp.avatar_url,
                licenses: [], // We need to fetch these or include in query
                shifts: [], // Same here
                rating: emp.rating,
                documentUrl: "",
                department: "Operations", // Placeholder
                hireDate: new Date().toISOString(), // Placeholder
                documents: [], // Placeholder
                skills: [], // Placeholder
            }));
            setEmployees(mappedEmployees);
        } catch (error) {
            console.error("Failed to load employees:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEmployeeClick = async (employee: Employee) => {
        try {
            const details = await employeeService.getEmployeeById(employee.id);
            // Merge details into selected employee
            setSelectedEmployee({ ...employee, ...details });
            setIsDetailOpen(true);
        } catch (error) {
            console.error("Failed to load employee details", error);
        }
    };

    const filteredEmployees = employees.filter((emp) =>
        emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (emp.position && emp.position.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return <div className="flex items-center justify-center h-full">Loading...</div>;
    }

    return (

        <div className="flex h-full bg-background no-scrollbar overflow-hidden">
            {/* Secondary Sidebar Filters */}
            <EmployeeFilters filters={filters} setFilters={setFilters} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="border-b border-border p-6 flex flex-col gap-4 bg-background">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Employee Management
                            </h1>
                            <p className="text-muted-foreground">
                                Manage your team, track licenses, and assignments.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Upload className="mr-2 h-4 w-4" />
                                Import CSV
                            </Button>
                            <Button onClick={() => setIsAddOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Employee
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search employees..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === "table" ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => setViewMode("table")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "card" ? "secondary" : "ghost"}
                                size="icon"
                                onClick={() => setViewMode("card")}
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="lg:hidden">
                                <FilterIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {/* Scrollable Content */}
                    <main className="flex-1 overflow-y-auto p-6">
                        <EmployeeStats
                            totalEmployees={employees.length}
                            activeAssignments={45}
                            complianceRate={87.5}
                            validLicenses={15}
                            expiringLicenses={5}
                            expiredLicenses={4}
                        />

                        <EmployeeList
                            employees={filteredEmployees}
                            viewMode={viewMode}
                            onEmployeeClick={handleEmployeeClick}
                        />
                    </main>
                </main>
            </div>

            {/* Modals */}
            {selectedEmployee && (
                <EmployeeDetailModal
                    employee={selectedEmployee}
                    isOpen={isDetailOpen}
                    onClose={() => setIsDetailOpen(false)}
                />
            )}

            {isAddOpen && (
                <AddEmployeeModal
                    isOpen={isAddOpen}
                    onClose={() => setIsAddOpen(false)}
                />
            )}
        </div>
    );
};

export default EmployeeManagement;
