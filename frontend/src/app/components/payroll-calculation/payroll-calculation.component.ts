import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { PayrollService } from '../../services/payroll.service';
import { Employee, Payroll } from '../../models/models';

@Component({
    selector: 'app-payroll-calculation',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container">
      <div class="page-header">
        <h1>Payroll Calculation</h1>
        <p class="text-muted">Calculate and process employee payroll</p>
      </div>

      <div class="grid grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Calculate Payroll</h3>
          </div>
          <div class="card-body">
            <form (ngSubmit)="calculatePayroll()">
              <div class="form-group">
                <label class="form-label">Select Employee *</label>
                <select 
                  class="form-control" 
                  [(ngModel)]="selectedEmployeeId"
                  name="employee"
                  required
                >
                  <option value="">Choose an employee</option>
                  <option *ngFor="let emp of employees" [value]="emp.employee_id">
                    {{ emp.first_name }} {{ emp.last_name }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Pay Period Start *</label>
                <input 
                  type="date" 
                  class="form-control" 
                  [(ngModel)]="payPeriod.start"
                  name="start_date"
                  required
                />
              </div>

              <div class="form-group">
                <label class="form-label">Pay Period End *</label>
                <input 
                  type="date" 
                  class="form-control" 
                  [(ngModel)]="payPeriod.end"
                  name="end_date"
                  required
                />
              </div>

              <button type="submit" class="btn btn-primary" [disabled]="!selectedEmployeeId || loading">
                💰 Calculate Payroll
              </button>
            </form>

            <div *ngIf="calculatedPayroll" class="payroll-preview mt-4">
              <h4>Payroll Preview</h4>
              <div class="preview-grid">
                <div class="preview-item">
                  <span class="label">Basic Salary:</span>
                  <span class="value">\${{ calculatedPayroll.basic_salary | number:'1.2-2' }}</span>
                </div>
                <div class="preview-item">
                  <span class="label">Overtime Pay:</span>
                  <span class="value">\${{ calculatedPayroll.overtime_pay | number:'1.2-2' }}</span>
                </div>
                <div class="preview-item">
                  <span class="label">Bonus:</span>
                  <span class="value">\${{ calculatedPayroll.bonus_amount | number:'1.2-2' }}</span>
                </div>
                <div class="preview-item">
                  <span class="label">Gross Pay:</span>
                  <span class="value text-success">\${{ calculatedPayroll.gross_pay | number:'1.2-2' }}</span>
                </div>
                <div class="preview-item">
                  <span class="label">Tax Deduction:</span>
                  <span class="value text-error">-\${{ calculatedPayroll.tax_deduction | number:'1.2-2' }}</span>
                </div>
                <div class="preview-item">
                  <span class="label">Other Deductions:</span>
                  <span class="value text-error">-\${{ calculatedPayroll.other_deductions | number:'1.2-2' }}</span>
                </div>
                <div class="preview-item highlight">
                  <span class="label"><strong>Net Pay:</strong></span>
                  <span class="value"><strong>\${{ calculatedPayroll.net_pay | number:'1.2-2' }}</strong></span>
                </div>
              </div>

              <button (click)="processPayroll()" class="btn btn-success mt-3">
                ✓ Process Payment
              </button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Payroll Records</h3>
          </div>
          <div class="card-body">
            <div *ngIf="payrollHistory.length === 0" class="text-center text-muted">
              No payroll records found
            </div>
            <div *ngFor="let payroll of payrollHistory" class="payroll-record">
              <div class="record-info">
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
    </div>
  `,
    styles: [`
    .page-header {
      margin-bottom: 2rem;
    }

    .payroll-preview {
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .payroll-preview h4 {
      margin-bottom: 1rem;
      color: var(--text-primary);
    }

    .preview-grid {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .preview-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .preview-item.highlight {
      background: rgba(99, 102, 241, 0.1);
      padding: 1rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--primary-color);
      margin-top: 0.5rem;
    }

    .preview-item .label {
      color: var(--text-secondary);
    }

    .preview-item .value {
      color: var(--text-primary);
      font-weight: 500;
    }

    .payroll-record {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .payroll-record:last-child {
      border-bottom: none;
    }

    .record-info strong {
      color: var(--text-primary);
    }
  `]
})
export class PayrollCalculationComponent implements OnInit {
    employees: Employee[] = [];
    payrollHistory: Payroll[] = [];
    selectedEmployeeId: number | null = null;
    payPeriod = {
        start: '',
        end: ''
    };
    calculatedPayroll: Payroll | null = null;
    loading = false;

    constructor(
        private employeeService: EmployeeService,
        private payrollService: PayrollService
    ) { }

    ngOnInit(): void {
        this.loadEmployees();
        this.loadPayrollHistory();
    }

    loadEmployees(): void {
        this.employeeService.getAllEmployees().subscribe({
            next: (data) => this.employees = data.filter(e => e.status === 'active'),
            error: (error) => console.error('Error loading employees:', error)
        });
    }

    loadPayrollHistory(): void {
        this.payrollService.getAllPayroll().subscribe({
            next: (data) => this.payrollHistory = data.slice(0, 10),
            error: (error) => console.error('Error loading payroll history:', error)
        });
    }

    calculatePayroll(): void {
        if (!this.selectedEmployeeId) return;

        this.loading = true;
        this.payrollService.calculatePayroll(this.selectedEmployeeId, this.payPeriod).subscribe({
            next: (data) => {
                this.calculatedPayroll = data;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error calculating payroll:', error);
                alert('Failed to calculate payroll');
                this.loading = false;
            }
        });
    }

    processPayroll(): void {
        if (!this.calculatedPayroll?.payroll_id) return;

        this.payrollService.processPayroll(this.calculatedPayroll.payroll_id).subscribe({
            next: () => {
                alert('Payroll processed successfully');
                this.calculatedPayroll = null;
                this.selectedEmployeeId = null;
                this.payPeriod = { start: '', end: '' };
                this.loadPayrollHistory();
            },
            error: (error) => {
                console.error('Error processing payroll:', error);
                alert('Failed to process payroll');
            }
        });
    }
}
