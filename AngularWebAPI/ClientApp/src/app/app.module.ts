import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TOASTR_TOKEN, Toastr } from './shared/services/toastr.service';
import { JQUERY_TOKEN } from './shared/services/jquery.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DisallowLoggedIn } from './services/guards/disallow-logged-in.guard';
import { DisallowAnonymous } from './services/guards/disallow-anonymous.guard';
import { CenteredFormContainerComponent } from './shared/components/centered-form-container/centered-form-container.component';
import { ProfileResolve } from './components/profile/profile.resolve.guard';

declare let toastr: Toastr;
declare let jQuery: any;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ProfileComponent,
    CenteredFormContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent, canActivate: [DisallowLoggedIn] },
      { path: 'register', component: RegisterComponent, canActivate: [DisallowLoggedIn] },
      { path: 'profile', component: ProfileComponent, canActivate: [DisallowAnonymous], resolve: { "userProfile": ProfileResolve } },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQUERY_TOKEN, useValue: jQuery }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
