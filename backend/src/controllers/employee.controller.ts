import { Request, Response } from 'express';
import Employee from '../models/employee.model.js';

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(parseInt(id as string));

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ error: 'Failed to fetch employee' });
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error: any) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: error.message || 'Failed to create employee' });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const employee = await Employee.update(parseInt(id as string), req.body);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json(employee);
    } catch (error: any) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: error.message || 'Failed to update employee' });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const success = await Employee.delete(parseInt(id as string));

        if (!success) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
};
