// Employee Model
export interface Employee {
    employee_id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    date_of_birth?: string;
    hire_date: string;
    department_id: number;
    position_id: number;
    salary: number;
    status?: string;
    created_at?: string;
    updated_at?: string;
}

// Department Model
export interface Department {
    department_id: number;
    department_name: string;
    description?: string;
}

// Position Model
export interface Position {
    position_id: number;
    position_name: string;
    base_salary: number;
    description?: string;
}

// Payroll Model
export interface Payroll {
    payroll_id?: number;
    employee_id: number;
    pay_period_start: string;
    pay_period_end: string;
    basic_salary: number;
    overtime_pay: number;
    bonus_amount: number;
    gross_pay: number;
    tax_deduction: number;
    other_deductions: number;
    net_pay: number;
    payment_date?: string;
    status: string;
    created_at?: string;
}

// User Model
export interface User {
    user_id?: number;
    username: string;
    email: string;
    role?: string;
}

// Login Request
export interface LoginRequest {
    username: string;
    password: string;
}

// Auth Response
export interface AuthResponse {
    token: string;
    user: User;
}

// Deduction Model
export interface Deduction {
    deduction_id: number;
    deduction_name: string;
    deduction_type: string;
    rate?: number;
    fixed_amount?: number;
    description?: string;
}

// Bonus Model
export interface Bonus {
    bonus_id?: number;
    employee_id: number;
    bonus_type: string;
    amount: number;
    bonus_date: string;
    description?: string;
}

// Report Model
export interface PayrollReport {
    employee_id: number;
    employee_name: string;
    department: string;
    position: string;
    gross_pay: number;
    net_pay: number;
    pay_period: string;
}
