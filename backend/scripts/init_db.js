const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

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
        console.log(`Checking database ${process.env.DB_NAME || 'payroll_db'}...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'payroll_db'}`);
        console.log('✓ Database ensured successfully');

        await connection.query(`USE ${process.env.DB_NAME || 'payroll_db'}`);

        console.log('Running schema...');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await connection.query(schemaSql);

        console.log('✓ Schema imported successfully');
    } catch (err) {
        console.error('Error initializing database:', err.message);
        process.exit(1);
    } finally {
        await connection.end();
    }
}

initializeDatabase();
