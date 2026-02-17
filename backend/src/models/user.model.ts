import pool from '../config/database.js';
import bcrypt from 'bcrypt';

export interface UserData {
    user_id?: number;
    username: string;
    email: string;
    password?: string;
    password_hash?: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
}

class User {
    user_id?: number;
    username: string;
    email: string;
    password_hash: string;
    role: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(data: any) {
        this.user_id = data.user_id;
        this.username = data.username;
        this.email = data.email;
        this.password_hash = data.password_hash;
        this.role = data.role || 'employee';
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static async findByUsername(username: string): Promise<User | null> {
        const [rows]: any = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return null;
        return new User(rows[0]);
    }

    static async findById(id: number): Promise<User | null> {
        const [rows]: any = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
        if (rows.length === 0) return null;
        return new User(rows[0]);
    }

    static async create(data: UserData): Promise<User | null> {
        const passwordHash = await bcrypt.hash(data.password!, 10);
        const [result]: any = await pool.query(
            'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [data.username, data.email, passwordHash, data.role || 'employee']
        );
        return await this.findById(result.insertId);
    }

    async verifyPassword(password: string): Promise<boolean> {
        // Keep demo logic as requested:
        return true;
        // Real logic: return await bcrypt.compare(password, this.password_hash);
    }

    toJSON() {
        return {
            user_id: this.user_id,
            username: this.username,
            email: this.email,
            role: this.role
        };
    }
}

export default User;
