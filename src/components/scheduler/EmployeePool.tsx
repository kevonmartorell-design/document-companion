import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, Clock, MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmployeeCard from "./EmployeeCard";
import { mockEmployees } from "@/data/mockEmployees";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const EmployeePool = () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        armed: false,
        available: true,
        minRating: 0,
        maxDistance: 50,
        positions: [] as string[]
    });

    const filteredEmployees = mockEmployees.filter(emp => {
        // Text Search
        const matchesSearch =
            emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
            emp.lastName.toLowerCase().includes(search.toLowerCase());

        // Armed License Filter
        const matchesArmed = !filters.armed || emp.licenses.some(l => l.name.toLowerCase().includes("armed") && l.status === "valid");

        // Rating Filter
        const matchesRating = emp.rating >= filters.minRating;

        // Position Filter
        const matchesPosition = filters.positions.length === 0 || filters.positions.includes(emp.position);

        return matchesSearch && matchesArmed && matchesRating && matchesPosition;
    });

    const activeFiltersCount = (filters.armed ? 1 : 0) + (filters.minRating > 0 ? 1 : 0) + (filters.positions.length > 0 ? 1 : 0);

    return (
        <div className="flex flex-col h-full bg-background">
            <div className="space-y-3 mb-4 p-1">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search staff..."
                        className="pl-9 h-9 bg-muted/40"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Quick Filters Row */}
                <div className="flex gap-2">
                    <Button
                        variant={filters.armed ? "secondary" : "outline"}
                        size="sm"
                        className="flex-1 text-xs h-8"
                        onClick={() => setFilters(prev => ({ ...prev, armed: !prev.armed }))}
                    >
                        {filters.armed ? "Armed Only" : "Armed"}
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 text-xs h-8 relative">
                                <Filter className="w-3 h-3 mr-1.5" />
                                Filters
                                {activeFiltersCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                        {activeFiltersCount}
                                    </span>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-4" align="start">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium text-sm flex items-center gap-2">
                                        <Star className="w-3 h-3" /> Min Rating: {filters.minRating}
                                    </h4>
                                    <Slider
                                        defaultValue={[0]}
                                        max={5}
                                        step={0.5}
                                        value={[filters.minRating]}
                                        onValueChange={([val]) => setFilters(prev => ({ ...prev, minRating: val }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium text-sm flex items-center gap-2">
                                        <MapPin className="w-3 h-3" /> Max Distance: {filters.maxDistance} miles
                                    </h4>
                                    <Slider
                                        defaultValue={[50]}
                                        max={100}
                                        step={5}
                                        value={[filters.maxDistance]}
                                        onValueChange={([val]) => setFilters(prev => ({ ...prev, maxDistance: val }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-medium text-sm">Positions</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["Officer", "Supervisor", "Medic", "Driver"].map(pos => (
                                            <div key={pos} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={pos}
                                                    checked={filters.positions.includes(pos)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            setFilters(prev => ({ ...prev, positions: [...prev.positions, pos] }));
                                                        } else {
                                                            setFilters(prev => ({ ...prev, positions: prev.positions.filter(p => p !== pos) }));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={pos} className="text-sm font-normal">{pos}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 px-1">
                <span>{filteredEmployees.length} Available</span>
                <span className="flex items-center gap-1 text-green-500">
                    <Clock className="w-3 h-3" /> Updated now
                </span>
            </div>

            <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="pb-4 space-y-2">
                    {filteredEmployees.map(emp => (
                        <EmployeeCard key={emp.id} employee={emp} />
                    ))}
                    {filteredEmployees.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                            No employees match your filters
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default EmployeePool;
