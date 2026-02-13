const pool = require('../config/database');

class Employee {
    constructor(data) {
        this.employee_id = data.employee_id;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.phone = data.phone;
        this.date_of_birth = data.date_of_birth;
        this.hire_date = data.hire_date;
        this.department_id = data.department_id;
        this.position_id = data.position_id;
        this.salary = parseFloat(data.salary);
        this.status = data.status || 'active';
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }

    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM employees ORDER BY created_at DESC');
        return rows.map(row => new Employee(row));
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM employees WHERE employee_id = ?', [id]);
        if (rows.length === 0) return null;
        return new Employee(rows[0]);
    }

    static async create(data) {
        this.validate(data);
        const [result] = await pool.query(
            `INSERT INTO employees 
            (first_name, last_name, email, phone, date_of_birth, hire_date, department_id, position_id, salary, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [data.first_name, data.last_name, data.email, data.phone, data.date_of_birth, data.hire_date, data.department_id, data.position_id, data.salary, data.status || 'active']
        );
        return await this.findById(result.insertId);
    }

    static async update(id, data) {
        this.validate(data);
        const [result] = await pool.query(
            `UPDATE employees 
            SET first_name = ?, last_name = ?, email = ?, phone = ?, 
                date_of_birth = ?, hire_date = ?, department_id = ?, 
                position_id = ?, salary = ?, status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE employee_id = ?`,
            [data.first_name, data.last_name, data.email, data.phone, data.date_of_birth, data.hire_date, data.department_id, data.position_id, data.salary, data.status, id]
        );
        if (result.affectedRows === 0) return null;
        return await this.findById(id);
    }

    static async delete(id) {
        const [result] = await pool.query('DELETE FROM employees WHERE employee_id = ?', [id]);
        return result.affectedRows > 0;
    }

    static validate(data) {
        if (!data.first_name || !data.last_name) {
            throw new Error('First name and last name are required');
        }
        if (!data.email || !data.email.includes('@')) {
            throw new Error('Valid email is required');
        }
        if (data.salary < 0) {
            throw new Error('Salary cannot be negative');
        }
    }
}

module.exports = Employee;
