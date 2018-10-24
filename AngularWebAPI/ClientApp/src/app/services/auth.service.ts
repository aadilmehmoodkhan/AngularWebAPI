import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Login } from './model/login';
import { LocalStoreService } from './local-store.service';
import { Signup } from './model/signup';
import { Profile } from './model/profile';
import { ApiResponse } from './model/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService,
    private localStore: LocalStoreService) {
  }

  private UserNameStoreKey = "UserName";

  login(model: Login): Observable<Object> {
    return this.httpClient.post(`${this.configService.apiSettings.authService}/login`, model);
  }

  register(model: Signup): Observable<Object> {
    return this.httpClient.post(`${this.configService.apiSettings.authService}/signup`, model);
  }

  updateProfile(model: Profile): Observable<Object> {
    return this.httpClient.put(`${this.configService.apiSettings.authService}/profile`, model);
  }

  getProfile(): Observable<ApiResponse<Profile>> {
    return this.httpClient.get<ApiResponse<Profile>>(`${this.configService.apiSettings.authService}/profile`);
  }

  logout(): Observable<Object> {
    return this.httpClient.post(`${this.configService.apiSettings.authService}/signout`,{ });
  }

  set LoggedInUserName(userName: string) {
    this.localStore.save(this.UserNameStoreKey, userName);
  }

  get LoggedInUserName() {
    return this.localStore.read(this.UserNameStoreKey);
  }

  ClearLoggedInUserName() {
    this.localStore.remote(this.UserNameStoreKey);
  }

  get UserLoggedIn(): boolean {
    return this.LoggedInUserName != null;
  }

}
