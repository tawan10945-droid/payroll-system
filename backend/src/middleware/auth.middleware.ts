import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: number;
    username: string;
    role: string;
    // Add other fields from your JWT payload
}

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: any; // You can make this more specific later
        }
    }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
