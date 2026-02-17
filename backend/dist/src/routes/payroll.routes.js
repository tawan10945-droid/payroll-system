import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { calculatePayroll, processPayroll, getPayrollHistory, getAllPayroll } from '../controllers/payroll.controller.js';
const router = express.Router();
router.post('/calculate', authMiddleware, calculatePayroll);
router.post('/process/:id', authMiddleware, processPayroll);
router.get('/history/:employeeId?', authMiddleware, getPayrollHistory);
router.get('/', authMiddleware, getAllPayroll);
export default router;
//# sourceMappingURL=payroll.routes.js.map