import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import {
    getPayrollSummary,
    generatePayslip,
    getTaxReport
} from '../controllers/report.controller.js';

const router = express.Router();

router.get('/payroll-summary', authMiddleware, getPayrollSummary);
router.get('/payslip/:payrollId', authMiddleware, generatePayslip);
router.get('/tax-report', authMiddleware, getTaxReport);

export default router;
