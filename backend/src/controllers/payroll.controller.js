const Payroll = require('../models/payroll.model');

const calculatePayroll = async (req, res) => {
    try {
        const { employee_id, pay_period_start, pay_period_end } = req.body;
        const payroll = await Payroll.calculate(employee_id, pay_period_start, pay_period_end);
        res.json(payroll);
    } catch (error) {
        console.error('Error calculating payroll:', error);
        res.status(500).json({ error: error.message || 'Failed to calculate payroll' });
    }
};

const processPayroll = async (req, res) => {
    try {
        const { id } = req.params;
        const payroll = await Payroll.markAsPaid(id);

        if (!payroll) {
            return res.status(404).json({ error: 'Payroll record not found' });
        }

        res.json(payroll);
    } catch (error) {
        console.error('Error processing payroll:', error);
        res.status(500).json({ error: 'Failed to process payroll' });
    }
};

const getPayrollHistory = async (req, res) => {
    try {
        const { employeeId } = req.params;
        let payrolls;

        if (employeeId) {
            payrolls = await Payroll.findByEmployeeId(employeeId);
        } else {
            payrolls = await Payroll.findAll();
        }

        res.json(payrolls);
    } catch (error) {
        console.error('Error fetching payroll history:', error);
        res.status(500).json({ error: 'Failed to fetch payroll history' });
    }
};

const getAllPayroll = async (req, res) => {
    try {
        const payrolls = await Payroll.findAll();
        res.json(payrolls);
    } catch (error) {
        console.error('Error fetching payroll:', error);
        res.status(500).json({ error: 'Failed to fetch payroll' });
    }
};

module.exports = {
    calculatePayroll,
    processPayroll,
    getPayrollHistory,
    getAllPayroll
};
