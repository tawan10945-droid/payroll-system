import express from 'express';
import pool from '../config/database.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router = express.Router();
router.get('/', authMiddleware, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM positions ORDER BY position_name');
        res.json(rows);
    }
    catch (error) {
        console.error('Error fetching positions:', error);
        res.status(500).json({ error: 'Failed to fetch positions' });
    }
});
export default router;
//# sourceMappingURL=position.routes.js.map