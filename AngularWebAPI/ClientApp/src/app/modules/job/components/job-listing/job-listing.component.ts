import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { JobPage } from '../../services/job-page';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit {

  pageNo: number;
  jobPage: JobPage;
  
  get jobs() { 
    return this.jobPage.data; 
  }

  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageNo = parseInt(params.pageNo || 1);
      this.jobPage = new JobPage(<JobPage>this.route.snapshot.data["jobPage"]);
      this.spinner.hide();
    });
  }

  onPageChanged(newPageNo) {
    this.pageNo = +newPageNo;
    this.router.navigate(["jobs", "list", this.pageNo])
  }
}
