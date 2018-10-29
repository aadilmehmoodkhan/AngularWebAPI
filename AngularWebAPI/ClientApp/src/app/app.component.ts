import { Component, OnInit } from '@angular/core';
import { routeAnimations } from './animations';
import { ConfigService } from './services/config.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {

  constructor(
    private configService: ConfigService,
    private authService: AuthService) {
      //this.authService.ClearLoggedInUserName();
    }

  title = 'Angular Demo Application';

  ngOnInit() {
    this.title = this.configService.siteName;
  }
}
