import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  confirmedPass = 'none';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toasvr: ToastrService
  ) { }

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z\\.\\s]*')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[\\d]{10}')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmedPassword: new FormControl('', [Validators.required])
  });

  submit(): void {
    if (this.password.value === this.confirmedPassword.value) {
      this.confirmedPass = 'none'
      const user = this.setFormValue()
      this.auth.registerNewUser(user).subscribe({
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
          const msg = err.error?.message? err.error?.message : 'Something went wrong'
          this.toasvr.error(msg, 'Error');
        }
      })
    }
    else
      this.confirmedPass = 'inline'
  }
  setFormValue(): User {
    let user = new User();
    user.name = this.name.value;
    user.email = this.email.value;
    user.phoneNumber = this.phoneNumber.value;
    user.password = this.password.value;

    return user;
  }

  get name(): FormControl {
    return this.registrationForm.get('name') as FormControl;
  }
  get phoneNumber(): FormControl {
    return this.registrationForm.get('phoneNumber') as FormControl;
  }
  get email(): FormControl {
    return this.registrationForm.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmedPassword(): FormControl {
    return this.registrationForm.get('confirmedPassword') as FormControl;
  }
}
