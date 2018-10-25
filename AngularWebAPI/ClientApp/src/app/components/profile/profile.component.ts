import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Toastr, TOASTR_TOKEN } from 'src/app/shared/services/toastr.service';
import { Profile } from 'src/app/services/model/profile';
import { ApiResponse, ResponseType } from 'src/app/services/model/apiResponse';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  model: Profile;

  constructor(
    private authService: AuthService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) { 
  }

  ngOnInit() {
    this.model = this.route.snapshot.data["userProfile"] as Profile;
    const dobAsString = this.model.dob == null ? "" : `${this.model.dob.getMonth() + 1}/${this.model.dob.getDate()}/${this.model.dob.getFullYear()}`;

    this.profileForm = this.fb.group({
      fullName: [this.model.fullName || "", [Validators.minLength(4), Validators.maxLength(100)]],
      dob: [dobAsString, Validators.pattern(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/)],
      bio: [this.model.bio || "", Validators.maxLength(1000)],
      age: [this.model.age || "", [Validators.min(10), Validators.max(100)]],
    });
  }

  SaveProfile() {
    if(this.profileForm.invalid) {
      this.toastr.error("Invalid data input");
      return false;
    }

    const updateProfile: Profile = Object.assign({}, this.profileForm.value);
    this.spinner.show();
    this.authService.updateProfile(updateProfile).subscribe(
      res => {
        const apiResponse = res as ApiResponse<any>;
            if(apiResponse.responseType == ResponseType.Success) {
              this.toastr.success(apiResponse.message);
              this.router.navigateByUrl("");
            }
      },
      err => {
        if(err.error.data !== null) {
          const list = err.error.data.map(o => `- ${o}<br />`);
          this.toastr.error(list, "Unable to save profile");
        }
      }
    )
    this.spinner.hide();

    return false;
  }

  get pf() {
    return this.profileForm.controls;
  }
}
