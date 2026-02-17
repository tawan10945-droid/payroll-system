import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await User.findByUsername(username);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await user.verifyPassword(password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { user_id: user.user_id, username: user.username, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret_key_change_this_in_production',
            { expiresIn: (process.env.JWT_EXPIRES_IN as any) || '24h' }
        );

        res.json({
            token,
            user: user.toJSON()
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            message: 'User registered successfully',
            user: user?.toJSON()
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
};
