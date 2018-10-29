import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { PostNewJob } from './postNewJob';
import { Observable } from 'rxjs';
import { SkillsAndCateories } from './skillsAndCategories';
import { JobModule } from '../job.module';

@Injectable()
export class JobService {

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService) { }

  postNewJob(model: PostNewJob): Observable<number> {
    return this.httpClient.post<number>(`${this.configService.apiSettings.jobService}/post`, model);
  }

  getAllSkillsAndCategories(): Observable<SkillsAndCateories> {
    return this.httpClient.get<SkillsAndCateories>(`${this.configService.apiSettings.jobService}/skillsAndCategories`);
  }
}
