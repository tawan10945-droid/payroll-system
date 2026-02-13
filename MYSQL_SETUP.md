# MySQL Database Setup Guide

The project has been migrated from PostgreSQL to MySQL. Follow these steps to set up the database and run the application.

## 1. Prerequisites

Ensure you have MySQL installed and running.

- **macOS**: `brew install mysql` && `brew services start mysql`
- **Windows**: Install via MySQL Installer
- **Linux**: `sudo apt install mysql-server`

## 2. Database Setup

1.  **Login to MySQL**:
    ```bash
    mysql -u root -p
    ```
    (Enter password if set, otherwise just press Enter)

2.  **Create Database**:
    ```sql
    CREATE DATABASE payroll_db;
    EXIT;
    ```

3.  **Import Schema**:
    ```bash
    mysql -u root -p payroll_db < database/schema.sql
    ```

## 3. Configure Environment Variables

Edit `backend/.env` to match your MySQL credentials:

```ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password  # Leave empty if no password
DB_NAME=payroll_db
PORT=3000
JWT_SECRET=your_secret_key
```

## 4. Run the Application

### Start Backend
```bash
cd backend
npm run dev
```

You should see: `✓ Connected to MySQL database`

### Start Frontend
```bash
cd frontend
npm start
```

## 5. Verification

Login with:
- **Username**: `admin`
- **Password**: `admin123`

## Troubleshooting

- **ER_ACCESS_DENIED_ERROR**: Check your `DB_USER` and `DB_PASSWORD` in `backend/.env`.
- **ER_BAD_DB_ERROR**: Ensure you created the database `payroll_db` before running the app.
- **ECONNREFUSED**: Ensure MySQL service is running.
