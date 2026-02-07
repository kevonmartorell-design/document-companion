import { supabase } from '../lib/supabaseClient';
import { Database } from '../types/database.types';

type Employee = Database['public']['Tables']['employees']['Row'];
type UnsavedEmployee = Database['public']['Tables']['employees']['Insert'];
type Certification = Database['public']['Tables']['certifications']['Row'];

export const employeeService = {
    async getEmployees() {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .order('last_name', { ascending: true });

        if (error) throw error;
        return data;
    },

    async getEmployeeById(id: string) {
        const { data, error } = await supabase
            .from('employees')
            .select('*, certifications(*)')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async createEmployee(employee: UnsavedEmployee) {
        const { data, error } = await supabase
            .from('employees')
            .insert(employee)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updateEmployee(id: string, updates: Partial<Employee>) {
        const { data, error } = await supabase
            .from('employees')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async getCertifications(employeeId: string) {
        const { data, error } = await supabase
            .from('certifications')
            .select('*')
            .eq('employee_id', employeeId);

        if (error) throw error;
        return data;
    }
};
