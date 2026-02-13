const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'payroll_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    socketPath: process.env.DB_SOCKET_PATH
});

// Test connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✓ Connected to MySQL database');
        connection.release();
    } catch (err) {
        console.error('Error connecting to MySQL database:', err.message);
    }
})();

module.exports = pool;
