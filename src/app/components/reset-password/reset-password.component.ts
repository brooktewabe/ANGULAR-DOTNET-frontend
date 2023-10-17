import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPassword } from 'src/app/models/reset-password.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  confirmedPass = 'none';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toasvr: ToastrService) { }

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmedPassword: new FormControl('', [Validators.required])
  });

  submit(): void {
    if (this.password.value === this.confirmedPassword.value) {
      this.confirmedPass = 'none'
      const data = this.setFormValue()
      this.auth.resetPassword(data).subscribe({
        next: res => {
          if (res.status === 0) {
            this.toasvr.success(res.data, 'Success');
            this.router.navigateByUrl('/login');
          }
          else {
            this.toasvr.error(res.message, 'Error');
          }
        },
        error: err => {
          const msg = err.error?.message ? err.error?.message : 'Somthing went wrong'
          this.toasvr.error(msg, 'Error');
        }
      })
    }
    else
      this.confirmedPass = 'inline'
  }

  setFormValue(): ResetPassword {
    let data = new ResetPassword();
    data.password = this.password.value;
    data.email = this.route.snapshot.queryParams['email'];
    data.token = this.route.snapshot.queryParams['token'];

    return data;
  }

  get password(): FormControl {
    return this.resetPasswordForm.get('password') as FormControl;
  }
  get confirmedPassword(): FormControl {
    return this.resetPasswordForm.get('confirmedPassword') as FormControl;
  }
}
