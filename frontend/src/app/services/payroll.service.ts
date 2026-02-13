import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payroll } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class PayrollService {
    private apiUrl = '/api/payroll';

    constructor(private http: HttpClient) { }

    calculatePayroll(employeeId: number, payPeriod: { start: string; end: string }): Observable<Payroll> {
        return this.http.post<Payroll>(`${this.apiUrl}/calculate`, {
            employee_id: employeeId,
            pay_period_start: payPeriod.start,
            pay_period_end: payPeriod.end
        });
    }

    processPayroll(payrollId: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/process/${payrollId}`, {});
    }

    getPayrollHistory(employeeId?: number): Observable<Payroll[]> {
        const url = employeeId
            ? `${this.apiUrl}/history/${employeeId}`
            : `${this.apiUrl}/history`;
        return this.http.get<Payroll[]>(url);
    }

    getAllPayroll(): Observable<Payroll[]> {
        return this.http.get<Payroll[]>(this.apiUrl);
    }
}
