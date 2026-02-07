import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileText, Clock, MoreVertical, Search, FileDiff } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const initialDocs = [
    { id: 1, name: "General Liability Insurance.pdf", type: "Insurance", version: "v2.0", date: "2024-02-01", status: "Active" },
    { id: 2, name: "Fire Safety Policy.docx", type: "Policy", version: "v1.1", date: "2024-01-15", status: "Active" },
    { id: 3, name: "Employee Handbook 2024.pdf", type: "Policy", version: "v1.0", date: "2024-01-01", status: "Active" },
    { id: 4, name: "State Business License.pdf", type: "License", version: "v4.0", date: "2023-12-10", status: "Active" },
];

export const DocumentVault = () => {
    const [docs, setDocs] = useState(initialDocs);
    const [search, setSearch] = useState("");

    const filteredDocs = docs.filter(doc => doc.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                    <CardTitle>Evidence & Document Vault</CardTitle>
                    <CardDescription>Securely store and version control your compliance documents.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Button>
                        <Upload className="mr-2 h-4 w-4" /> Upload Document
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center py-4">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search documents..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Document Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Version</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDocs.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-blue-500" />
                                        {doc.name}
                                    </TableCell>
                                    <TableCell>{doc.type}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md w-fit">
                                            <FileDiff className="h-3 w-3" />
                                            {doc.version}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {doc.date}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            {doc.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Document</DropdownMenuItem>
                                                <DropdownMenuItem>Upload New Version</DropdownMenuItem>
                                                <DropdownMenuItem>View Version History</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
