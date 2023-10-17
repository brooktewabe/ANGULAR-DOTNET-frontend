import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ForgetPassword } from 'src/app/models/forget-password.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  isEmailSent = false;

  constructor(private auth: AuthService, private toastr: ToastrService) { }

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  submit(): void {
    let data = new ForgetPassword();
    data.email = this.email.value;
    data.clientURL = 'http://localhost:4200/reset-password';
    this.auth.forgetPassword(data).subscribe({
      next: res => {
        if (res.status === 0) {
          this.isEmailSent = true;
        }
        else {
          this.toastr.error(res.message, 'Error');
        }
      },
      error: err => {
        const msg = err.error?.message ? err.error?.message : 'Somthing went wrong'
        this.toastr.error(msg, 'Error');
      }
    })
  }

  get email(): FormControl {
    return this.forgotPasswordForm.get('email') as FormControl
  }
}
