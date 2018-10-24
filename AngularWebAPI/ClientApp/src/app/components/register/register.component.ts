import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidationErrors } from '@angular/forms';
import { Toastr, TOASTR_TOKEN } from 'src/app/shared/services/toastr.service';
import { Signup } from 'src/app/services/model/signup';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResponse, ResponseType } from 'src/app/services/model/apiResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    @Inject(TOASTR_TOKEN) private toastr: Toastr) { 
    }

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    fullname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]]
  }, { validator: this.passwordCompareValidator })

  passwordCompareValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get("password").value;
    const confirmPassword = control.get("confirmPassword").value;
    if(password !== confirmPassword) {
      return { "passwordCompare": true };
    }
    return null;
  } 

  ngOnInit() {
  }

  register() {
    if(this.registerForm.valid) {
      const newUser: Signup = Object.assign({}, this.registerForm.value);
      this.spinner.show();
      this.authService.register(newUser)
        .subscribe(
          res => {
            const apiResponse = res as ApiResponse<any>;
            if(apiResponse.responseType == ResponseType.Success) {
              this.authService.LoggedInUserName = newUser.username;
              this.toastr.success(apiResponse.message);
              this.router.navigateByUrl("");
            }
          },
          err => {
            if(err.error.data !== null) {
              const list = err.error.data.map(o => `- ${o}<br />`);
              this.toastr.error(list, "Registration failed");
            }
          }
        );
      this.spinner.hide();
    }
  }

  get rf() {
    return this.registerForm.controls;
  }

}
