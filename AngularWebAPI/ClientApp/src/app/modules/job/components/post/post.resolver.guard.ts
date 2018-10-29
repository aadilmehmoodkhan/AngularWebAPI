import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { JobService } from "../../services/job.service";
import { SkillsAndCateories } from "../../services/skillsAndCategories";
import { map } from 'rxjs/operators';
import { JobModule } from "../../job.module";

@Injectable()
export class PostResolver implements Resolve<SkillsAndCateories> {

    constructor(private jobService: JobService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SkillsAndCateories>{
        return this.jobService.getAllSkillsAndCategories()
            .pipe(map(o => o));
    }
}