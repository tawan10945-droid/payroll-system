import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { PayrollReport } from '../../models/models';

@Component({
    selector: 'app-reports',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="container">
      <div class="page-header">
        <h1>Reports</h1>
        <p class="text-muted">Generate and view payroll reports</p>
      </div>

      <div class="grid grid-3 mb-4">
        <div class="report-card">
          <div class="report-icon">📊</div>
          <h3>Payroll Summary</h3>
          <p>Monthly payroll overview</p>
          <button (click)="showPayrollSummary()" class="btn btn-primary btn-sm">
            View Report
          </button>
        </div>

        <div class="report-card">
          <div class="report-icon">📄</div>
          <h3>Payslips</h3>
          <p>Individual employee payslips</p>
          <button (click)="showPayslips()" class="btn btn-primary btn-sm">
            View Report
          </button>
        </div>

        <div class="report-card">
          <div class="report-icon">💼</div>
          <h3>Tax Report</h3>
          <p>Annual tax deductions</p>
          <button (click)="showTaxReport()" class="btn btn-primary btn-sm">
            View Report
          </button>
        </div>
      </div>

      <div class="card" *ngIf="activeReport">
        <div class="card-header">
          <div class="flex justify-between align-center">
            <h3 class="card-title">{{ reportTitle }}</h3>
            <div class="flex gap-sm">
              <select class="form-control" [(ngModel)]="selectedMonth" (change)="loadReport()" style="width: 150px;">
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              <select class="form-control" [(ngModel)]="selectedYear" (change)="loadReport()" style="width: 120px;">
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
              <button (click)="exportReport()" class="btn btn-success btn-sm">
                📥 Export
              </button>
            </div>
          </div>
        </div>

        <div class="table-container">
          <table class="table" *ngIf="activeReport === 'payroll'">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Position</th>
                <th>Gross Pay</th>
                <th>Net Pay</th>
                <th>Pay Period</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="reportData.length === 0">
                <td colspan="6" class="text-center text-muted">No data available</td>
              </tr>
              <tr *ngFor="let record of reportData">
                <td><strong>{{ record.employee_name }}</strong></td>
                <td>{{ record.department }}</td>
                <td>{{ record.position }}</td>
                <td>\${{ record.gross_pay | number:'1.2-2' }}</td>
                <td>\${{ record.net_pay | number:'1.2-2' }}</td>
                <td>{{ record.pay_period }}</td>
              </tr>
            </tbody>
            <tfoot *ngIf="reportData.length > 0">
              <tr style="background: var(--bg-tertiary); font-weight: 600;">
                <td colspan="3">Total</td>
                <td>\${{ getTotalGross() | number:'1.2-2' }}</td>
                <td>\${{ getTotalNet() | number:'1.2-2' }}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>

          <div *ngIf="activeReport === 'payslips'" class="payslip-grid">
            <div class="payslip-card" *ngFor="let slip of payslips">
              <h4>{{ slip.employee_name }}</h4>
              <p class="text-muted">{{ slip.period }}</p>
              <div class="payslip-amount">
                <span>Net Pay:</span>
                <strong>\${{ slip.net_pay | number:'1.2-2' }}</strong>
              </div>
              <button class="btn btn-secondary btn-sm">
                📄 View Details
              </button>
            </div>
          </div>

          <div *ngIf="activeReport === 'tax'" class="tax-summary">
            <div class="summary-grid">
              <div class="summary-card">
                <h4>Total Tax Collected</h4>
                <p class="amount">\${{ taxSummary.total | number:'1.2-2' }}</p>
              </div>
              <div class="summary-card">
                <h4>Income Tax</h4>
                <p class="amount">\${{ taxSummary.income | number:'1.2-2' }}</p>
              </div>
              <div class="summary-card">
                <h4>Social Security</h4>
                <p class="amount">\${{ taxSummary.social | number:'1.2-2' }}</p>
              </div>
              <div class="summary-card">
                <h4>Other Deductions</h4>
                <p class="amount">\${{ taxSummary.other | number:'1.2-2' }}</p>
              </div>
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

    .report-card {
      background: var(--surface);
      border-radius: var(--radius-lg);
      padding: 2rem;
      text-align: center;
      box-shadow: var(--shadow-md);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all var(--transition-normal);
    }

    .report-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
      border-color: var(--primary-color);
    }

    .report-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .report-card h3 {
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .report-card p {
      margin-bottom: 1rem;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    .payslip-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      padding: 1rem;
    }

    .payslip-card {
      background: var(--bg-secondary);
      border-radius: var(--radius-md);
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .payslip-card h4 {
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .payslip-amount {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
      padding: 0.75rem;
      background: var(--surface);
      border-radius: var(--radius-sm);
    }

    .payslip-amount strong {
      color: var(--success);
      font-size: 1.2rem;
    }

    .tax-summary {
      padding: 2rem;
    }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .summary-card {
      background: var(--bg-secondary);
      border-radius: var(--radius-lg);
      padding: 2rem;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .summary-card h4 {
      margin-bottom: 1rem;
      color: var(--text-secondary);
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .summary-card .amount {
      font-size: 2rem;
      font-weight: 600;
      color: var(--primary-color);
      margin: 0;
    }
  `]
})
export class ReportsComponent implements OnInit {
    activeReport: string | null = null;
    reportTitle = '';
    selectedMonth = '01';
    selectedYear = '2026';
    reportData: PayrollReport[] = [];
    payslips: any[] = [];
    taxSummary = {
        total: 0,
        income: 0,
        social: 0,
        other: 0
    };

    constructor(private reportService: ReportService) { }

    ngOnInit(): void {
        const now = new Date();
        this.selectedMonth = String(now.getMonth() + 1).padStart(2, '0');
        this.selectedYear = String(now.getFullYear());
    }

    showPayrollSummary(): void {
        this.activeReport = 'payroll';
        this.reportTitle = 'Payroll Summary Report';
        this.loadReport();
    }

    showPayslips(): void {
        this.activeReport = 'payslips';
        this.reportTitle = 'Employee Payslips';
        this.loadPayslips();
    }

    showTaxReport(): void {
        this.activeReport = 'tax';
        this.reportTitle = 'Tax Deductions Report';
        this.loadTaxReport();
    }

    loadReport(): void {
        if (this.activeReport === 'payroll') {
            this.reportService.getPayrollSummary(this.selectedMonth, this.selectedYear).subscribe({
                next: (data) => this.reportData = data,
                error: (error) => console.error('Error loading report:', error)
            });
        }
    }

    loadPayslips(): void {
        // Mock data for demonstration
        this.payslips = [
            { employee_name: 'John Doe', period: 'Jan 2026', net_pay: 4500 },
            { employee_name: 'Jane Smith', period: 'Jan 2026', net_pay: 5200 },
            { employee_name: 'Bob Johnson', period: 'Jan 2026', net_pay: 3800 }
        ];
    }

    loadTaxReport(): void {
        this.reportService.getTaxReport(this.selectedYear).subscribe({
            next: (data) => {
                this.taxSummary = data;
            },
            error: (error) => {
                console.error('Error loading tax report:', error);
                // Mock data for demonstration
                this.taxSummary = {
                    total: 45000,
                    income: 25000,
                    social: 15000,
                    other: 5000
                };
            }
        });
    }

    getTotalGross(): number {
        return this.reportData.reduce((sum, record) => sum + record.gross_pay, 0);
    }

    getTotalNet(): number {
        return this.reportData.reduce((sum, record) => sum + record.net_pay, 0);
    }

    exportReport(): void {
        alert('Export functionality would download the report as PDF/Excel');
    }
}
