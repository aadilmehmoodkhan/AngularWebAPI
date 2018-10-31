import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from "@angular/router";
import { JobService } from "../../services/job.service";
import { Observable, of, never, pipe } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { JobPage } from "../../services/job-page";

@Injectable()
export class JobListingResolveGuard implements Resolve<JobPage> {

    constructor(
        private jobService: JobService,
        private spinner: NgxSpinnerService){
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobPage> {
        let pageNo = route.params["pageNo"] || 1;
        this.spinner.show();
        return this.jobService.getLatestJobs(pageNo);
    }
}