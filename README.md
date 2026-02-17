# Payroll Management System

A full-stack web application for managing employee payroll, built with Angular and Node.js.

## 🚀 Features

- **Employee Management**: CRUD operations for employee records
- **Payroll Calculation**: Automated payroll processing with tax and deduction calculations
- **Reports**: Generate payroll summaries, payslips, and tax reports
- **Dashboard**: Overview statistics and quick actions
- **Authentication**: Secure JWT-based authentication
- **Modern UI**: Professional dark theme with responsive design

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Database Setup

Create a MySQL database:

```bash
createdb payroll_db
```

Import the schema:

```bash
msql payroll_db < database/schema.sql
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Configure environment variables in `backend/.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=payroll_db
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3000
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200`

## 🔐 Default Login Credentials

- **Username**: admin
- **Password**: admin123

## 📁 Project Structure

```
payroll-system/
├── frontend/              # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # UI components
│   │   │   ├── services/      # API services
│   │   │   ├── models/        # TypeScript interfaces
│   │   │   ├── guards/        # Route guards
│   │   │   └── interceptors/  # HTTP interceptors
│   │   └── styles/            # Global styles
│   └── package.json
├── backend/               # Node.js/Express API
│   ├── src/
│   │   ├── routes/           # API routes
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Auth middleware
│   │   └── config/           # Database config
│   └── package.json
└── database/
    └── schema.sql            # Database schema
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Payroll
- `POST /api/payroll/calculate` - Calculate payroll
- `POST /api/payroll/process/:id` - Process payment
- `GET /api/payroll/history/:employeeId?` - Get payroll history
- `GET /api/payroll` - Get all payroll records

### Reports
- `GET /api/reports/payroll-summary` - Get payroll summary
- `GET /api/reports/payslip/:payrollId` - Generate payslip
- `GET /api/reports/tax-report` - Get tax report

## 🎨 Technologies Used

### Frontend
- Angular 17
- TypeScript
- RxJS
- CSS3 (Modern dark theme)

### Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt

## 📝 License

MIT License

## 👥 Author

Payroll System Development Team
