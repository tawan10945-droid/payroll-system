import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

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
    // Note: socketPath is usually for unix sockets, if you are testing locally on windows/mac it might not be needed
    socketPath: process.env.DB_SOCKET_PATH
});

// Test connection
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✓ Connected to MySQL database');
        connection.release();
    } catch (err: any) {
        console.error('Error connecting to MySQL database:', err.message);
    }
})();

export default pool;
