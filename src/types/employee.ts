export type EmployeeStatus = "active" | "inactive" | "on_leave" | "blocked";
export type LicenseStatus = "valid" | "expiring" | "expired";

export interface License {
    id: string;
    name: string;
    number: string;
    issuedDate: string;
    expirationDate: string;
    status: LicenseStatus;
    daysRemaining: number;
    documentUrl?: string;
    issuingAuthority?: string;
}

export interface Document {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    url: string;
}

export interface Shift {
    id: string;
    date: string;
    time: string;
    location: string;
    client: string;
    status: "assigned" | "checked_in" | "completed";
}

export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    photoUrl?: string;
    status: EmployeeStatus;
    hireDate: string;
    licenses: License[];
    documents: Document[];
    shifts: Shift[];
    rating: number;
    skills: string[];
}
