import { Injectable } from '@angular/core';
import { ApiSettings } from './model/api-settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  private apiBasePath = "/api";
  siteName: string = "Freelance World";
  apiSettings: ApiSettings = { 
    authService: `${this.apiBasePath}/auth`
  };
  
}
