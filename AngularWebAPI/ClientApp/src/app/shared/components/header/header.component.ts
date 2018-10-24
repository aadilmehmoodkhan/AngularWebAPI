import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  siteName: string;

  get userLoggedIn(): boolean {
    return this.authService.UserLoggedIn;
  }

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.siteName = this.configService.siteName;
  }

  logout() {
    this.authService.logout().subscribe();
    this.authService.ClearLoggedInUserName();
    this.router.navigateByUrl("");
  }
}
