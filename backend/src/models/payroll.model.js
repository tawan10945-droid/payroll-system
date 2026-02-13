const pool = require('../config/database');

class Payroll {
    constructor(data) {
        this.payroll_id = data.payroll_id;
        this.employee_id = data.employee_id;
        this.pay_period_start = data.pay_period_start;
        this.pay_period_end = data.pay_period_end;
        this.basic_salary = parseFloat(data.basic_salary);
        this.overtime_pay = parseFloat(data.overtime_pay || 0);
        this.bonus_amount = parseFloat(data.bonus_amount || 0);
        this.gross_pay = parseFloat(data.gross_pay);
        this.tax_deduction = parseFloat(data.tax_deduction);
        this.other_deductions = parseFloat(data.other_deductions);
        this.net_pay = parseFloat(data.net_pay);
        this.status = data.status || 'pending';
        this.payment_date = data.payment_date;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static async calculate(employee_id, start_date, end_date) {
        // Get employee details
        const [empRows] = await pool.query('SELECT * FROM employees WHERE employee_id = ?', [employee_id]);
        if (empRows.length === 0) throw new Error('Employee not found');
        const employee = empRows[0];

        const basic_salary = parseFloat(employee.salary);

        // Get bonuses
        const [bonusRows] = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) as total_bonus 
             FROM bonuses 
             WHERE employee_id = ? AND bonus_date BETWEEN ? AND ?`,
            [employee_id, start_date, end_date]
        );
        const bonus_amount = parseFloat(bonusRows[0].total_bonus);

        const overtime_pay = 0; // Simplified for now
        const gross_pay = basic_salary + overtime_pay + bonus_amount;

        // Constants for calculation (could be moved to config or settings model)
        const tax_rate = 0.15;
        const other_deductions = 200;

        const tax_deduction = gross_pay * tax_rate;
        const net_pay = gross_pay - tax_deduction - other_deductions;

        const [result] = await pool.query(
            `INSERT INTO payroll 
            (employee_id, pay_period_start, pay_period_end, basic_salary, overtime_pay, 
             bonus_amount, gross_pay, tax_deduction, other_deductions, net_pay, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
            [employee_id, start_date, end_date, basic_salary, overtime_pay, bonus_amount, gross_pay, tax_deduction, other_deductions, net_pay]
        );

        return await this.findById(result.insertId);
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM payroll WHERE payroll_id = ?', [id]);
        if (rows.length === 0) return null;
        return new Payroll(rows[0]);
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM payroll ORDER BY created_at DESC');
        return rows.map(row => new Payroll(row));
    }

    static async findByEmployeeId(employeeId) {
        const [rows] = await pool.query('SELECT * FROM payroll WHERE employee_id = ? ORDER BY created_at DESC', [employeeId]);
        return rows.map(row => new Payroll(row));
    }

    static async markAsPaid(id) {
        const [result] = await pool.query(
            `UPDATE payroll SET status = 'paid', payment_date = CURRENT_DATE, updated_at = CURRENT_TIMESTAMP WHERE payroll_id = ?`,
            [id]
        );
        if (result.affectedRows === 0) return null;
        return await this.findById(id);
    }
}

module.exports = Payroll;
