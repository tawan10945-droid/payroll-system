const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
    getPayrollSummary,
    generatePayslip,
    getTaxReport
} = require('../controllers/report.controller');

router.get('/payroll-summary', authMiddleware, getPayrollSummary);
router.get('/payslip/:payrollId', authMiddleware, generatePayslip);
router.get('/tax-report', authMiddleware, getTaxReport);

module.exports = router;
