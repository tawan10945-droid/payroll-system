import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee, Department, Position } from '../../models/models';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <div class="page-header">
        <h1>{{ isEditMode ? 'Edit Employee' : 'Add New Employee' }}</h1>
        <p class="text-muted">{{ isEditMode ? 'Update employee information' : 'Register a new employee' }}</p>
      </div>

      <div class="card" style="max-width: 800px; margin: 0 auto;">
        <form (ngSubmit)="onSubmit()" #employeeForm="ngForm">
          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">First Name *</label>
              <input 
                type="text" 
                class="form-control" 
                [(ngModel)]="employee.first_name"
                name="first_name"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Last Name *</label>
              <input 
                type="text" 
                class="form-control" 
                [(ngModel)]="employee.last_name"
                name="last_name"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Email *</label>
              <input 
                type="email" 
                class="form-control" 
                [(ngModel)]="employee.email"
                name="email"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Phone</label>
              <input 
                type="tel" 
                class="form-control" 
                [(ngModel)]="employee.phone"
                name="phone"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Date of Birth</label>
              <input 
                type="date" 
                class="form-control" 
                [(ngModel)]="employee.date_of_birth"
                name="date_of_birth"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Hire Date *</label>
              <input 
                type="date" 
                class="form-control" 
                [(ngModel)]="employee.hire_date"
                name="hire_date"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Department *</label>
              <select 
                class="form-control" 
                [(ngModel)]="employee.department_id"
                name="department_id"
                required
              >
                <option value="">Select Department</option>
                <option *ngFor="let dept of departments" [value]="dept.department_id">
                  {{ dept.department_name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Position *</label>
              <select 
                class="form-control" 
                [(ngModel)]="employee.position_id"
                name="position_id"
                required
              >
                <option value="">Select Position</option>
                <option *ngFor="let pos of positions" [value]="pos.position_id">
                  {{ pos.position_name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Salary *</label>
              <input 
                type="number" 
                class="form-control" 
                [(ngModel)]="employee.salary"
                name="salary"
                step="0.01"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Status</label>
              <select 
                class="form-control" 
                [(ngModel)]="employee.status"
                name="status"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary" [disabled]="!employeeForm.form.valid || loading">
              {{ isEditMode ? '💾 Update Employee' : '➕ Add Employee' }}
            </button>
            <button type="button" class="btn btn-secondary" (click)="cancel()">
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 768px) {
      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    first_name: '',
    last_name: '',
    email: '',
    hire_date: '',
    department_id: 0,
    position_id: 0,
    salary: 0,
    status: 'active'
  };
  departments: Department[] = [];
  positions: Position[] = [];
  isEditMode = false;
  loading = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadDepartments();
    this.loadPositions();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadEmployee(+id);
    }
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

  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => this.employee = data,
      error: (error) => console.error('Error loading employee:', error)
    });
  }

  onSubmit(): void {
    this.loading = true;

    const operation = this.isEditMode
      ? this.employeeService.updateEmployee(this.employee.employee_id!, this.employee)
      : this.employeeService.createEmployee(this.employee);

    operation.subscribe({
      next: () => {
        alert(`Employee ${this.isEditMode ? 'updated' : 'created'} successfully`);
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        console.error('Error saving employee:', error);
        alert('Failed to save employee');
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
