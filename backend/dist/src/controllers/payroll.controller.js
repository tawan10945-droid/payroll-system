import Payroll from '../models/payroll.model.js';
export const calculatePayroll = async (req, res) => {
    try {
        const { employee_id, pay_period_start, pay_period_end } = req.body;
        const payroll = await Payroll.calculate(employee_id, pay_period_start, pay_period_end);
        res.json(payroll);
    }
    catch (error) {
        console.error('Error calculating payroll:', error);
        res.status(500).json({ error: error.message || 'Failed to calculate payroll' });
    }
};
export const processPayroll = async (req, res) => {
    try {
        const { id } = req.params;
        const payroll = await Payroll.markAsPaid(parseInt(id));
        if (!payroll) {
            return res.status(404).json({ error: 'Payroll record not found' });
        }
        res.json(payroll);
    }
    catch (error) {
        console.error('Error processing payroll:', error);
        res.status(500).json({ error: 'Failed to process payroll' });
    }
};
export const getPayrollHistory = async (req, res) => {
    try {
        const { employeeId } = req.params;
        let payrolls;
        if (employeeId) {
            payrolls = await Payroll.findByEmployeeId(parseInt(employeeId));
        }
        else {
            payrolls = await Payroll.findAll();
        }
        res.json(payrolls);
    }
    catch (error) {
        console.error('Error fetching payroll history:', error);
        res.status(500).json({ error: 'Failed to fetch payroll history' });
    }
};
export const getAllPayroll = async (req, res) => {
    try {
        const payrolls = await Payroll.findAll();
        res.json(payrolls);
    }
    catch (error) {
        console.error('Error fetching payroll:', error);
        res.status(500).json({ error: 'Failed to fetch payroll' });
    }
};
//# sourceMappingURL=payroll.controller.js.map