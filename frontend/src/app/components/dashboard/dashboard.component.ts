import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { PayrollService } from '../../services/payroll.service';
import { Employee, Payroll } from '../../models/models';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="container">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p class="text-muted">Overview of your payroll system</p>
      </div>

      <div class="grid grid-4">
        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));">
            👥
          </div>
          <div class="stat-content">
            <h3>{{ totalEmployees }}</h3>
            <p>Total Employees</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, var(--secondary-color), var(--secondary-dark));">
            ✓
          </div>
          <div class="stat-content">
            <h3>{{ activeEmployees }}</h3>
            <p>Active Employees</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, var(--accent-color), #d97706);">
            💰
          </div>
          <div class="stat-content">
            <h3>\${{ totalPayroll | number:'1.2-2' }}</h3>
            <p>Total Payroll</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: linear-gradient(135deg, var(--info), #2563eb);">
            📊
          </div>
          <div class="stat-content">
            <h3>{{ pendingPayrolls }}</h3>
            <p>Pending Payrolls</p>
          </div>
        </div>
      </div>

      <div class="grid grid-2 mt-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Employees</h3>
          </div>
          <div class="card-body">
            <div *ngIf="recentEmployees.length === 0" class="text-center text-muted">
              No employees found
            </div>
            <div *ngFor="let employee of recentEmployees" class="employee-item">
              <div>
                <strong>{{ employee.first_name }} {{ employee.last_name }}</strong>
                <p class="text-muted" style="margin: 0; font-size: 0.85rem;">{{ employee.email }}</p>
              </div>
              <span class="badge badge-success">{{ employee.status }}</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Payrolls</h3>
          </div>
          <div class="card-body">
            <div *ngIf="recentPayrolls.length === 0" class="text-center text-muted">
              No payroll records found
            </div>
            <div *ngFor="let payroll of recentPayrolls" class="payroll-item">
              <div>
                <strong>\${{ payroll.net_pay | number:'1.2-2' }}</strong>
                <p class="text-muted" style="margin: 0; font-size: 0.85rem;">
                  {{ payroll.pay_period_start | date }} - {{ payroll.pay_period_end | date }}
                </p>
              </div>
              <span class="badge" [ngClass]="{
                'badge-success': payroll.status === 'paid',
                'badge-warning': payroll.status === 'pending',
                'badge-info': payroll.status === 'processing'
              }">{{ payroll.status }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="quick-actions mt-4">
        <h3>Quick Actions</h3>
        <div class="grid grid-3">
          <a routerLink="/employees/new" class="action-card">
            <div class="action-icon">➕</div>
            <h4>Add Employee</h4>
            <p>Register a new employee</p>
          </a>
          <a routerLink="/payroll" class="action-card">
            <div class="action-icon">💵</div>
            <h4>Process Payroll</h4>
            <p>Calculate and process payroll</p>
          </a>
          <a routerLink="/reports" class="action-card">
            <div class="action-icon">📄</div>
            <h4>Generate Reports</h4>
            <p>View and export reports</p>
          </a>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      margin-bottom: 0.5rem;
    }

    .stat-card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      box-shadow: var(--shadow-md);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all var(--transition-normal);
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      flex-shrink: 0;
    }

    .stat-content h3 {
      font-size: 2rem;
      margin: 0;
      color: var(--text-primary);
    }

    .stat-content p {
      margin: 0;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .employee-item, .payroll-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .employee-item:last-child, .payroll-item:last-child {
      border-bottom: none;
    }

    .quick-actions h3 {
      margin-bottom: 1rem;
    }

    .action-card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      padding: 2rem;
      text-align: center;
      text-decoration: none;
      color: var(--text-primary);
      box-shadow: var(--shadow-md);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all var(--transition-normal);
    }

    .action-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
      border-color: var(--primary-color);
    }

    .action-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .action-card h4 {
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .action-card p {
      margin: 0;
      color: var(--text-muted);
      font-size: 0.9rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
    totalEmployees = 0;
    activeEmployees = 0;
    totalPayroll = 0;
    pendingPayrolls = 0;
    recentEmployees: Employee[] = [];
    recentPayrolls: Payroll[] = [];

    constructor(
        private employeeService: EmployeeService,
        private payrollService: PayrollService
    ) { }

    ngOnInit(): void {
        this.loadDashboardData();
    }

    loadDashboardData(): void {
        this.employeeService.getAllEmployees().subscribe({
            next: (employees) => {
                this.totalEmployees = employees.length;
                this.activeEmployees = employees.filter(e => e.status === 'active').length;
                this.recentEmployees = employees.slice(0, 5);
            },
            error: (error) => console.error('Error loading employees:', error)
        });

        this.payrollService.getAllPayroll().subscribe({
            next: (payrolls) => {
                this.totalPayroll = payrolls.reduce((sum, p) => sum + p.net_pay, 0);
                this.pendingPayrolls = payrolls.filter(p => p.status === 'pending').length;
                this.recentPayrolls = payrolls.slice(0, 5);
            },
            error: (error) => console.error('Error loading payrolls:', error)
        });
    }
}
