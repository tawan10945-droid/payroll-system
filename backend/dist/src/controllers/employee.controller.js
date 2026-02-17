import Employee from '../models/employee.model.js';
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    }
    catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
};
export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(parseInt(id));
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    }
    catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
};
export const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    }
    catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: error.message || 'Failed to create employee' });
    }
};
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.update(parseInt(id), req.body);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    }
    catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: error.message || 'Failed to update employee' });
    }
};
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const success = await Employee.delete(parseInt(id));
        if (!success) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
};
//# sourceMappingURL=employee.controller.js.map