import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PayrollReport } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private apiUrl = '/api/reports';

    constructor(private http: HttpClient) { }

    getPayrollSummary(month: string, year: string): Observable<PayrollReport[]> {
        return this.http.get<PayrollReport[]>(`${this.apiUrl}/payroll-summary`, {
            params: { month, year }
        });
    }

    generatePayslip(payrollId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/payslip/${payrollId}`);
    }

    getTaxReport(year: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/tax-report`, {
            params: { year }
        });
    }

    exportReport(type: string, params: any): Observable<Blob> {
        return this.http.post(`${this.apiUrl}/export/${type}`, params, {
            responseType: 'blob'
        });
    }
}
