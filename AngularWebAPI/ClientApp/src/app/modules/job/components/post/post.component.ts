import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormArray, ValidationErrors, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillsAndCateories } from '../../services/skillsAndCategories';
import { PostNewJob } from '../../services/postNewJob';
import { JobService } from '../../services/job.service';
import { Toastr, TOASTR_TOKEN } from 'src/app/shared/services/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

function singleCheckboxMustBeSelected(): ValidatorFn {
  return (control: FormArray) : {[key: string]: any} =>
    (control.controls.filter(o => o.value == true).length > 0)
      ? null 
      : { "singleCheckboxMustBeSelected": "Please choose at least one option" };
}

function jobRateValidation(form: FormGroup): ValidationErrors {
    const hourlyRate = form.get("hourlyRate").value || "";
    const fixedPrice = form.get("fixedPrice").value || "";
    if(hourlyRate == "" && fixedPrice == "") {
      return { "jobRate": "Please specify Hourly rate or Fixed price" };
    }
    return null;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private jobService: JobService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  postJob: FormGroup;
  skillsAndCategories: SkillsAndCateories;
  model: PostNewJob;

  ngOnInit() {
    this.model = { title: '', details: '', hourlyRate: null, fixedPrice: null, skills: [], categories: [] };
    this.skillsAndCategories = this.route.snapshot.data["skillsAndCategories"] as SkillsAndCateories;
    this.postJob = this.formBuilder.group({
      title: [this.model.title, [Validators.required, Validators.maxLength(500)]],
      details: [this.model.details, [Validators.required, Validators.maxLength(4000)]],
      hourlyRate: [this.model.hourlyRate],
      fixedPrice: [this.model.fixedPrice],
      skills: this.formBuilder.array(this.skillsAndCategories.skills.map(o => this.model.skills.indexOf(o.id) > -1), [singleCheckboxMustBeSelected()]),
      categories: this.formBuilder.array(this.skillsAndCategories.categories.map(o => this.model.categories.indexOf(o.id) > -1), [singleCheckboxMustBeSelected()])
    }, { validator: jobRateValidation })
  }

  PostJob() {
    this.model = Object.assign({}, this.postJob.value, { skills: [], categories: [] });
    this.postJob.value.skills.forEach((v, i) => { if(v == true){ this.model.skills.push(this.skillsAndCategories.skills[i].id) } });
    this.postJob.value.categories.forEach((v, i) => { if(v == true){ this.model.categories.push(this.skillsAndCategories.categories[i].id) } });
    
    this.spinner.show();
    this.jobService.postNewJob(this.model)
      .subscribe(res => {
        this.toastr.info(`Job posted`);
        this.router.navigate(["jobs"]);
      }, error => {
        this.toastr.error(`Error: ` + error.message);
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      })
  }

  get f() {
    return this.postJob.controls;
  }

  get skillsControls(): AbstractControl[] {
    return (<FormArray>this.postJob.get("skills")).controls;
  }

  get categoriesControls(): AbstractControl[] {
    return (<FormArray>this.postJob.get("categories")).controls;
  }

}


