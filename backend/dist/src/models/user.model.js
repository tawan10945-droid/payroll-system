import pool from '../config/database.js';
import bcrypt from 'bcrypt';
class User {
    user_id;
    username;
    email;
    password_hash;
    role;
    created_at;
    updated_at;
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
        if (rows.length === 0)
            return null;
        return new User(rows[0]);
    }
    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
        if (rows.length === 0)
            return null;
        return new User(rows[0]);
    }
    static async create(data) {
        const passwordHash = await bcrypt.hash(data.password, 10);
        const [result] = await pool.query('INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)', [data.username, data.email, passwordHash, data.role || 'employee']);
        return await this.findById(result.insertId);
    }
    async verifyPassword(password) {
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
//# sourceMappingURL=user.model.js.map