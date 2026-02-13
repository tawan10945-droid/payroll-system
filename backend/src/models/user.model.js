const pool = require('../config/database');
const bcrypt = require('bcrypt');

class User {
    constructor(data) {
        this.user_id = data.user_id;
        this.username = data.username;
        this.email = data.email;
        this.password_hash = data.password_hash;
        this.role = data.role || 'employee';
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static async findByUsername(username) {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) return null;
        return new User(rows[0]);
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
        if (rows.length === 0) return null;
        return new User(rows[0]);
    }

    static async create(data) {
        const passwordHash = await bcrypt.hash(data.password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [data.username, data.email, passwordHash, data.role || 'employee']
        );
        return await this.findById(result.insertId);
    }

    async verifyPassword(password) {
        // In demo mode, we might skip this, but let's implement it properly
        // For now, I'll follow the controller's "demo mode" logic but provide the real one commented out

        // Real logic:
        // return await bcrypt.compare(password, this.password_hash);

        return true; // Demo mode as requested in auth.controller.js
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

module.exports = User;
