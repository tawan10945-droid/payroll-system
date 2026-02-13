import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/models';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="container">
      <div class="page-header">
        <div>
          <h1>Employees</h1>
          <p class="text-muted">Manage your employee records</p>
        </div>
        <a routerLink="/employees/new" class="btn btn-primary">
          ➕ Add Employee
        </a>
      </div>

      <div class="card">
        <div class="card-header">
          <input 
            type="text" 
            class="form-control" 
            placeholder="🔍 Search employees..."
            [(ngModel)]="searchTerm"
            (input)="filterEmployees()"
            style="max-width: 400px;"
          />
        </div>

        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Position</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngIf="filteredEmployees.length === 0">
                <td colspan="8" class="text-center text-muted">
                  No employees found
                </td>
              </tr>
              <tr *ngFor="let employee of filteredEmployees">
                <td>
                  <strong>{{ employee.first_name }} {{ employee.last_name }}</strong>
                </td>
                <td>{{ employee.email }}</td>
                <td>{{ employee.phone || 'N/A' }}</td>
                <td>{{ getDepartmentName(employee.department_id) }}</td>
                <td>{{ getPositionName(employee.position_id) }}</td>
                <td>\${{ employee.salary | number:'1.2-2' }}</td>
                <td>
                  <span class="badge" [ngClass]="{
                    'badge-success': employee.status === 'active',
                    'badge-danger': employee.status === 'inactive'
                  }">{{ employee.status }}</span>
                </td>
                <td>
                  <div class="action-buttons">
                    <a [routerLink]="['/employees/edit', employee.employee_id]" class="btn btn-secondary btn-sm">
                      ✏️ Edit
                    </a>
                    <button (click)="deleteEmployee(employee.employee_id!)" class="btn btn-danger btn-sm">
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      margin-bottom: 0.5rem;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .btn-sm {
      padding: 0.4rem 0.8rem;
      font-size: 0.85rem;
    }

    @media (max-width: 768px) {
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .table-container {
        overflow-x: auto;
      }

      .action-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  departments: any[] = [];
  positions: any[] = [];
  searchTerm = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
    this.loadPositions();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;
      },
      error: (error) => console.error('Error loading employees:', error)
    });
  }

  loadDepartments(): void {
    this.employeeService.getDepartments().subscribe({
      next: (data) => this.departments = data,
      error: (error) => console.error('Error loading departments:', error)
    });
  }

  loadPositions(): void {
    this.employeeService.getPositions().subscribe({
      next: (data) => this.positions = data,
      error: (error) => console.error('Error loading positions:', error)
    });
  }

  filterEmployees(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.first_name.toLowerCase().includes(term) ||
      emp.last_name.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term)
    );
  }

  getDepartmentName(id: number): string {
    const dept = this.departments.find(d => d.department_id === id);
    return dept ? dept.department_name : 'N/A';
  }

  getPositionName(id: number): string {
    const pos = this.positions.find(p => p.position_id === id);
    return pos ? pos.position_name : 'N/A';
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees();
          alert('Employee deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee');
        }
      });
    }
  }
}
