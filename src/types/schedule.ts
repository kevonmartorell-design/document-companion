export type ShiftStatus = 'open' | 'posted' | 'filled' | 'in-progress' | 'completed' | 'cancelled' | 'partially-filled';
export type AssignmentStatus = 'pending' | 'approved' | 'active' | 'completed' | 'no-show' | 'cancelled';
export type CertificationType = 'armed' | 'unarmed' | 'cpr' | 'first-aid' | 'driver' | 'supervisor';

export interface Client {
    id: string;
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    address: string;
    preferredGuardIds: string[];
    blacklistedGuardIds: string[];
}

export interface Location {
    id: string;
    clientId: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    notes: string;
}

export interface Shift {
    id: string;
    clientId: string;
    locationId: string;
    start: Date;
    end: Date;
    requiredCertifications: CertificationType[];
    positionsNeeded: number;
    positionsFilled: number;
    payRate: number; // Hourly rate for the guard
    billRate: number; // Hourly rate to the client
    status: ShiftStatus;
    specialInstructions?: string;
    recurringScheduleId?: string;
    color?: string; // For calendar visualization
}

export interface Assignment {
    id: string;
    shiftId: string;
    employeeId: string;
    status: AssignmentStatus;
    assignedAt: Date;
    assignedBy: string; // Manager ID
    checkInTime?: Date;
    checkOutTime?: Date;
    actualHours?: number;
    startTime?: Date; // For UI visualization convenience
    endTime?: Date;   // For UI visualization convenience
}

export interface ShiftTemplate {
    id: string;
    name: string;
    clientId: string;
    locationId: string;
    startTime: string; // "09:00"
    endTime: string; // "17:00"
    durationHours: number;
    requiredCertifications: CertificationType[];
    positions: number;
    defaultPayRate?: number;
}

export interface RecurringSchedule {
    id: string;
    templateId: string;
    frequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly';
    daysOfWeek: number[]; // 0=Sunday, 1=Monday...
    startDate: Date;
    endDate?: Date;
    autoAssignEmployeeId?: string;
}
