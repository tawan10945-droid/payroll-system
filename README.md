# Payroll Management System

A full-stack web application for managing employee payroll, built with **Angular 17** and **Node.js + TypeScript**.

## 🚀 Features

- **Employee Management**: CRUD operations for employee records
- **Payroll Calculation**: Automated payroll processing with tax and deduction calculations
- **Reports**: Generate payroll summaries, payslips, and tax reports
- **Dashboard**: Overview statistics and quick actions
- **Authentication**: Secure JWT-based authentication
- **Modern UI**: Professional dark theme with responsive design

## 📋 Prerequisites

- Node.js (v20 or higher)
- MySQL (v8.0 or higher)
- npm
- Docker & Docker Compose _(optional, for containerized setup)_

## 🛠️ Installation

### Option A: Local Development

<<<<<<< HEAD
Create a MySQL database:
=======
#### 1. Database Setup

Create a MySQL database and import the schema:
>>>>>>> 36dcb9ad (update readme)

```bash
mysql -u root -p -e "CREATE DATABASE payroll_db;"
mysql -u root -p payroll_db < database/schema.sql
```

<<<<<<< HEAD
Import the schema:

```bash
msql payroll_db < database/schema.sql
```

### 2. Backend Setup
=======
#### 2. Backend Setup
>>>>>>> 36dcb9ad (update readme)

```bash
cd backend
npm install
```

Configure environment variables in `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=payroll_db
DB_USER=root
DB_PASSWORD=your_password
PORT=3000
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:4200`

---

### Option B: Docker Compose

Run the entire stack (MySQL + Backend + Frontend) with a single command:

```bash
docker-compose up --build
```

| Service  | URL                       |
|----------|---------------------------|
| Frontend | http://localhost           |
| Backend  | http://localhost:3000      |
| MySQL    | localhost:3306             |

Configure `backend/.env.docker` for the Docker environment before starting.

## 🔐 Default Login Credentials

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `admin123` |

## 📁 Project Structure

```
payroll-system/
├── .github/
│   └── workflows/
│       ├── ci.yml             # CI — build & test on push/PR
│       └── deploy.yml         # CD — Docker push to AWS ECR
├── frontend/                  # Angular 17 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # UI components
│   │   │   ├── services/      # API services
│   │   │   ├── models/        # TypeScript interfaces
│   │   │   ├── guards/        # Route guards
│   │   │   └── interceptors/  # HTTP interceptors
│   │   └── styles/            # Global styles
│   └── package.json
├── backend/                   # Node.js + TypeScript API
│   ├── src/
│   │   ├── routes/            # API routes
│   │   ├── controllers/       # Business logic
│   │   ├── middleware/        # Auth middleware
│   │   └── config/            # Database config
│   └── package.json
├── database/
│   └── schema.sql             # MySQL database schema
├── docker-compose.yml         # Local Docker Compose config
├── aws-apprunner.yaml         # AWS App Runner config
└── aws-infrastructure.yaml    # AWS CloudFormation template
```

## 🎯 API Endpoints

### Authentication
| Method | Endpoint              | Description       |
|--------|-----------------------|-------------------|
| POST   | `/api/auth/login`     | User login        |
| POST   | `/api/auth/register`  | User registration |

### Employees
| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/employees`      | Get all employees    |
| GET    | `/api/employees/:id`  | Get employee by ID   |
| POST   | `/api/employees`      | Create employee      |
| PUT    | `/api/employees/:id`  | Update employee      |
| DELETE | `/api/employees/:id`  | Delete employee      |

### Payroll
| Method | Endpoint                          | Description            |
|--------|-----------------------------------|------------------------|
| POST   | `/api/payroll/calculate`          | Calculate payroll      |
| POST   | `/api/payroll/process/:id`        | Process payment        |
| GET    | `/api/payroll/history/:employeeId`| Get payroll history    |
| GET    | `/api/payroll`                    | Get all payroll records|

### Reports
| Method | Endpoint                             | Description         |
|--------|--------------------------------------|---------------------|
| GET    | `/api/reports/payroll-summary`       | Payroll summary     |
| GET    | `/api/reports/payslip/:payrollId`    | Generate payslip    |
| GET    | `/api/reports/tax-report`            | Tax report          |

## 🎨 Technologies Used

### Frontend
- Angular 17
- TypeScript
- RxJS
- CSS3 (Modern dark theme)

### Backend
- Node.js + TypeScript
- Express.js
<<<<<<< HEAD
- MySQL
- JWT Authentication
- bcrypt

### Docker
- docker compose up --build

### AWS Redeploy/Update
- ./deploy-aws.sh

=======
- MySQL 8
- JWT Authentication
- bcrypt

### DevOps & Infrastructure
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- AWS ECR (Container Registry)
- AWS App Runner / CloudFormation

## ⚙️ CI/CD Pipeline

| Workflow | Trigger                     | Action                              |
|----------|-----------------------------|-------------------------------------|
| `ci.yml` | Push / PR to `main`         | Install deps & build (backend + frontend) |
| `deploy.yml` | Push to `main`          | Build & push Docker images to AWS ECR     |

### Required GitHub Secrets

| Secret                  | Description              |
|-------------------------|--------------------------|
| `AWS_ACCESS_KEY_ID`     | AWS IAM access key ID    |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key       |
| `AWS_REGION`            | Target AWS region        |
>>>>>>> 36dcb9ad (update readme)

## 📝 License

MIT License

## 👥 Author

Payroll System Development BY TAWAN
