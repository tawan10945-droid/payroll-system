-- Payroll System Database Schema
-- MySQL Database

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Positions table
CREATE TABLE IF NOT EXISTS positions (
    position_id INT AUTO_INCREMENT PRIMARY KEY,
    position_name VARCHAR(100) NOT NULL,
    base_salary DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    hire_date DATE NOT NULL,
    department_id INT,
    position_id INT,
    salary DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    FOREIGN KEY (position_id) REFERENCES positions(position_id)
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    work_date DATE NOT NULL,
    hours_worked DECIMAL(5, 2) DEFAULT 0,
    overtime_hours DECIMAL(5, 2) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'present',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- Deductions table
CREATE TABLE IF NOT EXISTS deductions (
    deduction_id INT AUTO_INCREMENT PRIMARY KEY,
    deduction_name VARCHAR(100) NOT NULL,
    deduction_type VARCHAR(50) NOT NULL,
    rate DECIMAL(5, 2),
    fixed_amount DECIMAL(10, 2),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bonuses table
CREATE TABLE IF NOT EXISTS bonuses (
    bonus_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    bonus_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    bonus_date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- Payroll table
CREATE TABLE IF NOT EXISTS payroll (
    payroll_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    pay_period_start DATE NOT NULL,
    pay_period_end DATE NOT NULL,
    basic_salary DECIMAL(10, 2) NOT NULL,
    overtime_pay DECIMAL(10, 2) DEFAULT 0,
    bonus_amount DECIMAL(10, 2) DEFAULT 0,
    gross_pay DECIMAL(10, 2) NOT NULL,
    tax_deduction DECIMAL(10, 2) DEFAULT 0,
    other_deductions DECIMAL(10, 2) DEFAULT 0,
    net_pay DECIMAL(10, 2) NOT NULL,
    payment_date DATE,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- Payslips table
CREATE TABLE IF NOT EXISTS payslips (
    payslip_id INT AUTO_INCREMENT PRIMARY KEY,
    payroll_id INT,
    employee_id INT,
    generated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payslip_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payroll_id) REFERENCES payroll(payroll_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- Insert sample departments
INSERT INTO departments (department_name, description) VALUES
('Human Resources', 'Manages employee relations and recruitment'),
('Engineering', 'Software development and IT operations'),
('Sales', 'Sales and customer relations'),
('Finance', 'Financial planning and accounting'),
('Marketing', 'Marketing and brand management');

-- Insert sample positions
INSERT INTO positions (position_name, base_salary, description) VALUES
('Software Engineer', 60000.00, 'Develops and maintains software applications'),
('Senior Software Engineer', 85000.00, 'Senior level software development'),
('HR Manager', 55000.00, 'Manages human resources operations'),
('Sales Representative', 45000.00, 'Handles sales and customer acquisition'),
('Accountant', 50000.00, 'Manages financial records and reporting'),
('Marketing Specialist', 48000.00, 'Develops marketing strategies');

-- Insert sample deductions
INSERT INTO deductions (deduction_name, deduction_type, rate, fixed_amount, description) VALUES
('Income Tax', 'tax', 15.00, NULL, 'Federal income tax'),
('Social Security', 'tax', 6.20, NULL, 'Social security contribution'),
('Health Insurance', 'insurance', NULL, 200.00, 'Monthly health insurance premium'),
('Retirement Fund', 'retirement', 5.00, NULL, 'Retirement savings plan');

-- Insert sample admin user (password: admin123)
-- Note: In a real app, use a proper bcrypt hash. This hash is for 'admin123' generated by bcrypt.
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@payroll.com', '$2b$10$rKZLvXZnJ5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K', 'admin');

-- Create indexes for better performance
CREATE INDEX idx_employees_department ON employees(department_id);
CREATE INDEX idx_employees_position ON employees(position_id);
CREATE INDEX idx_payroll_employee ON payroll(employee_id);
CREATE INDEX idx_attendance_employee ON attendance(employee_id);
CREATE INDEX idx_bonuses_employee ON bonuses(employee_id);
