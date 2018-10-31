import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JobListingComponent } from './components/job-listing/job-listing.component';
import { PostComponent } from './components/post/post.component';
import { DisallowAnonymous } from 'src/app/services/guards/disallow-anonymous.guard';
import { SharedModule } from '../shared/shared.module';
import { PostResolver } from './components/post/post.resolver.guard';
import { HttpClientModule } from '@angular/common/http';
import { JobService } from './services/job.service';
import { JobListingResolveGuard } from './components/job-listing/job-listing.resolve.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: JobListingComponent, canActivate: [DisallowAnonymous], resolve: { "jobPage" : JobListingResolveGuard } },
      { path: "list/:pageNo", component: JobListingComponent, canActivate: [DisallowAnonymous], resolve: { "jobPage" : JobListingResolveGuard } },
      { path: "post", component: PostComponent, canActivate: [DisallowAnonymous], resolve: { "skillsAndCategories": PostResolver } }
    ]),
    SharedModule,
    HttpClientModule
  ],
  declarations: [JobListingComponent, PostComponent],
  providers: [JobService, PostResolver, JobListingResolveGuard]
})
export class JobModule { }
