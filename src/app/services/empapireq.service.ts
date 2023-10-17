import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { IEmployeeApi } from '../components/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class EmpapireqService {
  private readonly apiUrl = 'https://localhost:7244/api';

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) { }

  // Casting to array
  getEmployeesapi(): Observable<IEmployeeApi[]> {
    const url = `${this.apiUrl}/ToDoItem`;
    return this.http.get<IEmployeeApi[]>(url).pipe(
      catchError(this.errorHandler)
    );
  }

  // Add new employee
  postEmployeeapi(employee: IEmployeeApi): Observable<IEmployeeApi> {
    const url = `${this.apiUrl}/ToDoItem`;
    return this.http.post<IEmployeeApi>(url, employee).pipe(
      catchError(this.errorHandler)
    );
  }

  // Update employee
  putEmployeeapi(employee: IEmployeeApi): Observable<IEmployeeApi> {
    const url = `${this.apiUrl}/ToDoItem/${employee.Id}`;
    return this.http.put<IEmployeeApi>(url, employee).pipe(
      catchError(this.errorHandler)
    );
  }

  // Delete employee
  deleteEmployeeapi(id: number): Observable<any> {
    const url = `${this.apiUrl}/ToDoItem/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message || 'server error'));
  }
}
