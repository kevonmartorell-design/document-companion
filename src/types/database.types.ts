export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            assignments: {
                Row: {
                    check_in_time: string | null
                    check_out_time: string | null
                    created_at: string | null
                    employee_id: string | null
                    id: string
                    shift_id: string | null
                    status: Database["public"]["Enums"]["assignment_status"] | null
                    updated_at: string | null
                }
                Insert: {
                    check_in_time?: string | null
                    check_out_time?: string | null
                    created_at?: string | null
                    employee_id?: string | null
                    id?: string
                    shift_id?: string | null
                    status?: Database["public"]["Enums"]["assignment_status"] | null
                    updated_at?: string | null
                }
                Update: {
                    check_in_time?: string | null
                    check_out_time?: string | null
                    created_at?: string | null
                    employee_id?: string | null
                    id?: string
                    shift_id?: string | null
                    status?: Database["public"]["Enums"]["assignment_status"] | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "assignments_employee_id_fkey"
                        columns: ["employee_id"]
                        isOneToOne: false
                        referencedRelation: "employees"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "assignments_shift_id_fkey"
                        columns: ["shift_id"]
                        isOneToOne: false
                        referencedRelation: "shifts"
                        referencedColumns: ["id"]
                    },
                ]
            }
            certifications: {
                Row: {
                    created_at: string | null
                    document_url: string | null
                    employee_id: string | null
                    expiration_date: string | null
                    id: string
                    issue_date: string | null
                    name: string
                    status: Database["public"]["Enums"]["certification_status"] | null
                    type: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    document_url?: string | null
                    employee_id?: string | null
                    expiration_date?: string | null
                    id?: string
                    issue_date?: string | null
                    name: string
                    status?: Database["public"]["Enums"]["certification_status"] | null
                    type?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    document_url?: string | null
                    employee_id?: string | null
                    expiration_date?: string | null
                    id?: string
                    issue_date?: string | null
                    name?: string
                    status?: Database["public"]["Enums"]["certification_status"] | null
                    type?: string | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "certifications_employee_id_fkey"
                        columns: ["employee_id"]
                        isOneToOne: false
                        referencedRelation: "employees"
                        referencedColumns: ["id"]
                    },
                ]
            }
            clients: {
                Row: {
                    created_at: string | null
                    email: string | null
                    id: string
                    name: string
                    phone: string | null
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    email?: string | null
                    id?: string
                    name: string
                    phone?: string | null
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string | null
                    id?: string
                    name?: string
                    phone?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            employees: {
                Row: {
                    avatar_url: string | null
                    created_at: string | null
                    email: string
                    first_name: string
                    id: string
                    last_name: string
                    phone: string | null
                    rating: number | null
                    role: Database["public"]["Enums"]["user_role"] | null
                    status: Database["public"]["Enums"]["employee_status"] | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string | null
                    email: string
                    first_name: string
                    id?: string
                    last_name: string
                    phone?: string | null
                    rating?: number | null
                    role?: Database["public"]["Enums"]["user_role"] | null
                    status?: Database["public"]["Enums"]["employee_status"] | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string | null
                    email?: string
                    first_name?: string
                    id?: string
                    last_name?: string
                    phone?: string | null
                    rating?: number | null
                    role?: Database["public"]["Enums"]["user_role"] | null
                    status?: Database["public"]["Enums"]["employee_status"] | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Relationships: []
            }
            locations: {
                Row: {
                    address: string | null
                    client_id: string | null
                    created_at: string | null
                    id: string
                    latitude: number | null
                    longitude: number | null
                    name: string
                    updated_at: string | null
                }
                Insert: {
                    address?: string | null
                    client_id?: string | null
                    created_at?: string | null
                    id?: string
                    latitude?: number | null
                    longitude?: number | null
                    name: string
                    updated_at?: string | null
                }
                Update: {
                    address?: string | null
                    client_id?: string | null
                    created_at?: string | null
                    id?: string
                    latitude?: number | null
                    longitude?: number | null
                    name?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "locations_client_id_fkey"
                        columns: ["client_id"]
                        isOneToOne: false
                        referencedRelation: "clients"
                        referencedColumns: ["id"]
                    },
                ]
            }
            shift_templates: {
                Row: {
                    client_id: string | null
                    created_at: string | null
                    details: Json | null
                    duration_hours: number | null
                    end_time: string
                    id: string
                    location_id: string | null
                    name: string
                    start_time: string
                    updated_at: string | null
                }
                Insert: {
                    client_id?: string | null
                    created_at?: string | null
                    details?: Json | null
                    duration_hours?: number | null
                    end_time: string
                    id?: string
                    location_id?: string | null
                    name: string
                    start_time: string
                    updated_at?: string | null
                }
                Update: {
                    client_id?: string | null
                    created_at?: string | null
                    details?: Json | null
                    duration_hours?: number | null
                    end_time?: string
                    id?: string
                    location_id?: string | null
                    name?: string
                    start_time?: string
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "shift_templates_client_id_fkey"
                        columns: ["client_id"]
                        isOneToOne: false
                        referencedRelation: "clients"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "shift_templates_location_id_fkey"
                        columns: ["location_id"]
                        isOneToOne: false
                        referencedRelation: "locations"
                        referencedColumns: ["id"]
                    },
                ]
            }
            shifts: {
                Row: {
                    bill_rate: number | null
                    client_id: string | null
                    created_at: string | null
                    end_time: string
                    id: string
                    location_id: string | null
                    pay_rate: number | null
                    positions_filled: number | null
                    positions_needed: number | null
                    required_certifications: string[] | null
                    start_time: string
                    status: Database["public"]["Enums"]["shift_status"] | null
                    updated_at: string | null
                }
                Insert: {
                    bill_rate?: number | null
                    client_id?: string | null
                    created_at?: string | null
                    end_time: string
                    id?: string
                    location_id?: string | null
                    pay_rate?: number | null
                    positions_filled?: number | null
                    positions_needed?: number | null
                    required_certifications?: string[] | null
                    start_time: string
                    status?: Database["public"]["Enums"]["shift_status"] | null
                    updated_at?: string | null
                }
                Update: {
                    bill_rate?: number | null
                    client_id?: string | null
                    created_at?: string | null
                    end_time?: string
                    id?: string
                    location_id?: string | null
                    pay_rate?: number | null
                    positions_filled?: number | null
                    positions_needed?: number | null
                    required_certifications?: string[] | null
                    start_time?: string
                    status?: Database["public"]["Enums"]["shift_status"] | null
                    updated_at?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "shifts_client_id_fkey"
                        columns: ["client_id"]
                        isOneToOne: false
                        referencedRelation: "clients"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "shifts_location_id_fkey"
                        columns: ["location_id"]
                        isOneToOne: false
                        referencedRelation: "locations"
                        referencedColumns: ["id"]
                    },
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            assignment_status:
            | "scheduled"
            | "confirmed"
            | "checked_in"
            | "checked_out"
            | "cancelled"
            certification_status: "valid" | "expiring" | "expired"
            employee_status: "active" | "inactive" | "on_leave"
            shift_status: "open" | "filled" | "completed" | "cancelled"
            user_role: "admin" | "manager" | "employee"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
