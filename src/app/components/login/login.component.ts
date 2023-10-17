import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isValidUser!: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  login(): void {
    const credentials = this.getCredentials();
    this.auth.login(credentials).subscribe({
      next: res => {
        if (res.status === 0) {
          this.isValidUser = true;
          //.token was .data changed as backend baseResponse is changed, other comp might need changes too 
          this.auth.setToken(res.token);
          this.router.navigateByUrl("/home");
        }
        else {
          this.isValidUser = false;
          this.toastr.error(res.message, 'Error');
        }
      },
      error: err => {
        this.isValidUser = false;
        const msg = err.error?.message ? err.error?.message : 'Somthing went wrong'
        this.toastr.error(msg, 'Error');
      }
    });
  }

  getCredentials(): Login {
    let credentials = new Login();
    credentials.email = this.email.value;
    credentials.password = this.password.value;
    return credentials;
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl
  }

}
