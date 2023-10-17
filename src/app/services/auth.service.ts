import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForgetPassword } from '../models/forget-password.model';
import { Login } from '../models/login.model';
import { ResetPassword } from '../models/reset-password.model';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  baseURL = 'https://localhost:7244/api/User/'
  tokenName = 'bearer_token'

  constructor(private http: HttpClient,private cookie:CookieService) { }

  registerNewUser(data: User): Observable<any> {
    return this.http.post(`${this.baseURL}Create`, data);
  }

  login(credentials: Login): Observable<any> {
    return this.http.post(`${this.baseURL}Login`, credentials)
  }

  forgetPassword(data: ForgetPassword): Observable<any> {
    return this.http.post(`${this.baseURL}ForgetPassword`, data);
  }

  resetPassword(data: ResetPassword): Observable<any> {
    return this.http.post(`${this.baseURL}ResetPassword`, data);
  }

  setToken(token: string): void {
  localStorage.setItem(this.tokenName, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenName);
  }

  isLoggedInUser(): boolean {
    return localStorage.getItem(this.tokenName) ? true : false;
  }

  getToken(){
    return localStorage.getItem(this.tokenName);
  }
}
