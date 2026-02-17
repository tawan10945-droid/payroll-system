import express from 'express';
import pool from '../config/database.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        const [rows]: any = await pool.query('SELECT * FROM departments ORDER BY department_name');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ error: 'Failed to fetch departments' });
    }
});

export default router;
