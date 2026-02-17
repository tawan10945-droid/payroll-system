import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });
const schemaPath = path.join(__dirname, '../../database/schema.sql');
async function initializeDatabase() {
    console.log('🔄 Initializing MySQL database...');
    // 1. Connect without database to create 'payroll_db' if needed
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });
    try {
        const dbName = process.env.DB_NAME || 'payroll_db';
        console.log(`Checking database ${dbName}...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        console.log('✓ Database ensured successfully');
        await connection.query(`USE ${dbName}`);
        console.log('Running schema...');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await connection.query(schemaSql);
        console.log('✓ Schema imported successfully');
    }
    catch (err) {
        console.error('Error initializing database:', err.message);
        process.exit(1);
    }
    finally {
        await connection.end();
    }
}
initializeDatabase();
//# sourceMappingURL=init_db.js.map