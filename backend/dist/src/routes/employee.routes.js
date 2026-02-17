import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employee.controller.js';
const router = express.Router();
router.get('/', authMiddleware, getAllEmployees);
router.get('/:id', authMiddleware, getEmployeeById);
router.post('/', authMiddleware, createEmployee);
router.put('/:id', authMiddleware, updateEmployee);
router.delete('/:id', authMiddleware, deleteEmployee);
export default router;
//# sourceMappingURL=employee.routes.js.map