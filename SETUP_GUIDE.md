# Payroll System Setup Guide

## Quick Start Guide

### Step 1: Database Setup

1. **Install PostgreSQL** (if not already installed):
   - macOS: `brew install postgresql`
   - Start PostgreSQL: `brew services start postgresql`

2. **Create Database**:
   ```bash
   createdb payroll_db
   ```

3. **Import Schema**:
   ```bash
   psql payroll_db < database/schema.sql
   ```

4. **Verify Database**:
   ```bash
   psql payroll_db
   \dt  # List all tables
   ```

### Step 2: Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Configure Environment** (already created):
   - Edit `.env` file if needed
   - Default credentials: `postgres/postgres`

3. **Start Backend Server**:
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ✓ Connected to PostgreSQL database
   🚀 Server running on http://localhost:3000
   📊 API endpoints available at http://localhost:3000/api
   ```

### Step 3: Frontend Setup

1. **Open a new terminal** and navigate to frontend:
   ```bash
   cd frontend
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

   The app will open at `http://localhost:4200`

### Step 4: Login

Use these credentials:
- **Username**: `admin`
- **Password**: `admin123`

## Project Features

### ✅ Completed Features

1. **Authentication System**
   - JWT-based authentication
   - Secure login/logout
   - Protected routes

2. **Employee Management**
   - Add, edit, delete employees
   - Search and filter functionality
   - Department and position assignment

3. **Payroll Processing**
   - Automated payroll calculation
   - Tax and deduction management
   - Overtime and bonus calculations
   - Payment processing

4. **Reporting**
   - Payroll summaries
   - Individual payslips
   - Tax reports
   - Export functionality

5. **Dashboard**
   - Statistics overview
   - Recent employees
   - Recent payrolls
   - Quick actions

### 🎨 UI Features

- Modern dark theme
- Responsive design
- Professional color scheme
- Smooth animations
- Form validation
- Loading states
- Error handling

## API Testing

You can test the API using curl or Postman:

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get Employees (requires token)
```bash
curl http://localhost:3000/api/employees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `brew services list`
- Check credentials in `backend/.env`
- Ensure database exists: `psql -l`

### Port Already in Use
- Backend (3000): Change `PORT` in `backend/.env`
- Frontend (4200): Run `ng serve --port 4201`

### Module Not Found Errors
- Reinstall dependencies: `npm install`
- Clear cache: `npm cache clean --force`

## Next Steps

1. **Add Sample Data**: Create employees and process payroll
2. **Explore Features**: Try all CRUD operations
3. **Generate Reports**: View payroll summaries and reports
4. **Customize**: Modify colors, add features, etc.

## Support

For issues or questions, refer to:
- README.md for detailed documentation
- Database schema in `database/schema.sql`
- API endpoints in backend routes
