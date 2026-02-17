import pool from '../config/database.js';
export const getPayrollSummary = async (req, res) => {
    try {
        const { month, year } = req.query;
        const [rows] = await pool.query(`SELECT 
        e.employee_id,
        CONCAT(e.first_name, ' ', e.last_name) as employee_name,
        d.department_name as department,
        p.position_name as position,
        pr.gross_pay,
        pr.net_pay,
        CONCAT(pr.pay_period_start, ' - ', pr.pay_period_end) as pay_period
       FROM payroll pr
       JOIN employees e ON pr.employee_id = e.employee_id
       JOIN departments d ON e.department_id = d.department_id
       JOIN positions p ON e.position_id = p.position_id
       WHERE MONTH(pr.pay_period_start) = ? 
       AND YEAR(pr.pay_period_start) = ?
       ORDER BY e.last_name`, [month, year]);
        res.json(rows);
    }
    catch (error) {
        console.error('Error generating payroll summary:', error);
        res.status(500).json({ error: 'Failed to generate payroll summary' });
    }
};
export const generatePayslip = async (req, res) => {
    try {
        const { payrollId } = req.params;
        const [rows] = await pool.query(`SELECT 
        pr.*,
        e.first_name,
        e.last_name,
        e.email,
        d.department_name,
        p.position_name
       FROM payroll pr
       JOIN employees e ON pr.employee_id = e.employee_id
       JOIN departments d ON e.department_id = d.department_id
       JOIN positions p ON e.position_id = p.position_id
       WHERE pr.payroll_id = ?`, [payrollId]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Payroll record not found' });
        }
        res.json(rows[0]);
    }
    catch (error) {
        console.error('Error generating payslip:', error);
        res.status(500).json({ error: 'Failed to generate payslip' });
    }
};
export const getTaxReport = async (req, res) => {
    try {
        const { year } = req.query;
        const [rows] = await pool.query(`SELECT 
        SUM(tax_deduction) as total,
        SUM(tax_deduction * 0.6) as income,
        SUM(tax_deduction * 0.3) as social,
        SUM(tax_deduction * 0.1) as other
       FROM payroll
       WHERE YEAR(pay_period_start) = ?`, [year]);
        res.json(rows[0]);
    }
    catch (error) {
        console.error('Error generating tax report:', error);
        res.status(500).json({ error: 'Failed to generate tax report' });
    }
};
//# sourceMappingURL=report.controller.js.map