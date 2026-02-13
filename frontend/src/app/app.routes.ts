import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'employees',
        loadComponent: () => import('./components/employee-list/employee-list.component').then(m => m.EmployeeListComponent),
        canActivate: [authGuard]
    },
    {
        path: 'employees/new',
        loadComponent: () => import('./components/employee-form/employee-form.component').then(m => m.EmployeeFormComponent),
        canActivate: [authGuard]
    },
    {
        path: 'employees/edit/:id',
        loadComponent: () => import('./components/employee-form/employee-form.component').then(m => m.EmployeeFormComponent),
        canActivate: [authGuard]
    },
    {
        path: 'payroll',
        loadComponent: () => import('./components/payroll-calculation/payroll-calculation.component').then(m => m.PayrollCalculationComponent),
        canActivate: [authGuard]
    },
    {
        path: 'reports',
        loadComponent: () => import('./components/reports/reports.component').then(m => m.ReportsComponent),
        canActivate: [authGuard]
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];
