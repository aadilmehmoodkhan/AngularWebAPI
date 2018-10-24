import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toastr, TOASTR_TOKEN } from 'src/app/shared/services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required, Validators.minLength(4)]),
      password: new FormControl("", Validators.required)
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService.login(this.loginForm.value)
        .subscribe(
          res => {
            this.authService.LoggedInUserName = this.loginForm.value.username;
            this.spinner.hide();
            this.toastr.success("Succesfull login");
            this.router.navigateByUrl("profile");
          },
          err => {
            this.spinner.hide();
            this.toastr.error("Access is denied");
          }
        )
    }
  }

  get lf() {
    return this.loginForm.controls;
  }

}