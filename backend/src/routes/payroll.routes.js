const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
    calculatePayroll,
    processPayroll,
    getPayrollHistory,
    getAllPayroll
} = require('../controllers/payroll.controller');

router.post('/calculate', authMiddleware, calculatePayroll);
router.post('/process/:id', authMiddleware, processPayroll);
router.get('/history/:employeeId?', authMiddleware, getPayrollHistory);
router.get('/', authMiddleware, getAllPayroll);

module.exports = router;
