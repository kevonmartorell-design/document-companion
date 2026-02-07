import { supabase } from '../lib/supabaseClient';
import { Database } from '../types/database.types';

type Shift = Database['public']['Tables']['shifts']['Row'];
type UnsavedShift = Database['public']['Tables']['shifts']['Insert'];
type Assignment = Database['public']['Tables']['assignments']['Row'];
type UnsavedAssignment = Database['public']['Tables']['assignments']['Insert'];
type ShiftTemplate = Database['public']['Tables']['shift_templates']['Row'];

export const scheduleService = {
    async getShifts(start: Date, end: Date) {
        const { data, error } = await supabase
            .from('shifts')
            .select('*, clients(name), locations(name), assignments(*)')
            .gte('start_time', start.toISOString())
            .lte('end_time', end.toISOString());

        if (error) throw error;
        return data;
    },

    async createShift(shift: UnsavedShift) {
        const { data, error } = await supabase
            .from('shifts')
            .insert(shift)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updateShift(id: string, updates: Partial<Shift>) {
        const { data, error } = await supabase
            .from('shifts')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async createAssignment(assignment: UnsavedAssignment) {
        const { data, error } = await supabase
            .from('assignments')
            .insert(assignment)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updateAssignmentStatus(id: string, status: Database['public']['Enums']['assignment_status']) {
        const { data, error } = await supabase
            .from('assignments')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async getShiftTemplates() {
        const { data, error } = await supabase
            .from('shift_templates')
            .select('*');

        if (error) throw error;
        return data;
    },

    async getClients() {
        const { data, error } = await supabase.from('clients').select('*');
        if (error) throw error;
        return data;
    },

    async getLocations(clientId?: string) {
        let query = supabase.from('locations').select('*');
        if (clientId) {
            query = query.eq('client_id', clientId);
        }
        const { data, error } = await query;
        if (error) throw error;
        return data;
    }
};
