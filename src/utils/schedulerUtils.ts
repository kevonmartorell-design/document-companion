import { Employee } from "@/types/employee";
import { Shift, Assignment } from "@/types/schedule";
import { differenceInHours, areIntervalsOverlapping, subHours } from "date-fns";

export type ConflictType = 'hard' | 'soft';

export interface SchedulingConflict {
    type: ConflictType;
    reason: string;
    details?: string;
}

export const checkConflicts = (
    employee: Employee,
    shift: Shift,
    existingAssignments: Assignment[],
    allShifts: Shift[]
): SchedulingConflict[] => {
    const conflicts: SchedulingConflict[] = [];

    // --- HARD BLOCKS ---

    // 1. Certification Mismatch
    const missingCerts = shift.requiredCertifications.filter(reqCert =>
        !employee.licenses.some(lic =>
            lic.name.toLowerCase().includes(reqCert.toLowerCase()) &&
            lic.status === "valid"
        )
    );

    if (missingCerts.length > 0) {
        conflicts.push({
            type: 'hard',
            reason: `Missing Required Certification(s): ${missingCerts.join(", ")}`
        });
    }

    // 2. Overlapping Shifts
    const employeeAssignments = existingAssignments.filter(a => a.employeeId === employee.id);
    const employeeShifts = allShifts.filter(s => employeeAssignments.some(a => a.shiftId === s.id));

    const isOverlapping = employeeShifts.some(existingShift =>
        areIntervalsOverlapping(
            { start: existingShift.start, end: existingShift.end },
            { start: shift.start, end: shift.end }
        )
    );

    if (isOverlapping) {
        conflicts.push({
            type: 'hard',
            reason: "Double Booking: Employee already has a shift at this time."
        });
    }

    // --- SOFT WARNINGS ---

    // 1. Overtime Warning (> 40 hours/week)
    // Simplified calculation for this demo
    const currentHours = employeeShifts.reduce((total, s) => itemDuration(s) + total, 0);
    const newShiftDuration = itemDuration(shift);
    if (currentHours + newShiftDuration > 40) {
        conflicts.push({
            type: 'soft',
            reason: "Overtime Warning: This assignment puts the employee over 40 hours."
        });
    }

    // 2. Turnover Time (< 8 hours between shifts)
    const recentShift = employeeShifts.find(s =>
        Math.abs(differenceInHours(s.end, shift.start)) < 8 ||
        Math.abs(differenceInHours(s.start, shift.end)) < 8
    );

    if (recentShift) {
        conflicts.push({
            type: 'soft',
            reason: "Fatigue Warning: Less than 8 hours between shifts."
        });
    }

    return conflicts;
};

const itemDuration = (shift: Shift): number => {
    return differenceInHours(shift.end, shift.start);
};

export interface EmployeeMatch {
    employee: Employee;
    score: number;
    reasons: string[];
    hasConflicts: boolean;
}

export const getRecommendedEmployees = (
    shift: Shift,
    employees: Employee[],
    assignments: Assignment[],
    shifts: Shift[]
): EmployeeMatch[] => {
    return employees.map(employee => {
        let score = 100;
        const reasons: string[] = [];
        let hasConflicts = false;

        // 1. Check Hard Conflicts (Double Booking)
        const conflicts = checkConflicts(employee, shift, assignments, shifts);
        const hardConflicts = conflicts.filter(c => c.type === 'hard');
        const softConflicts = conflicts.filter(c => c.type === 'soft');

        if (hardConflicts.length > 0) {
            score = -1000;
            hasConflicts = true;
            reasons.push(`⛔ ${hardConflicts.map(c => c.message).join(", ")}`);
        } else {
            // 2. Check Certifications (Bonus for exact matches, penalty for missing)
            // Note: checkConflicts already handles missing certs as a hard conflict, 
            // but we can add positive reinforcement here for specific skills if needed.

            // 3. Soft Conflicts (Overtime, Fatigue)
            if (softConflicts.length > 0) {
                score -= softConflicts.length * 20;
                reasons.push(`⚠️ ${softConflicts.map(c => c.message).join(", ")}`);
            }

            // 4. Distance Preference
            // Mocking distance calculation - in real app, calculate distance from employee address to shift location
            const mockDistance = Math.floor(Math.random() * 50); // 0-50 miles
            if (mockDistance < 10) {
                score += 20;
                reasons.push("📍 Close proximity (< 10 miles)");
            } else if (mockDistance > 40) {
                score -= 10;
                reasons.push("🚗 Long commute (> 40 miles)");
            }

            // 5. Rating Preference
            if (employee.rating >= 4.5) {
                score += 15;
                reasons.push("⭐ Top Rated Guard");
            }

            // 6. Seniority/Experience
            // Mock logic
            if (employee.status === 'Active') {
                score += 5;
            }
        }

        return { employee, score, reasons, hasConflicts };
    }).sort((a, b) => b.score - a.score); // Sort by score descending
};
