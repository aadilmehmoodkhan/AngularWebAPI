import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  siteName: string;
  userLoggedIn: boolean;

  constructor(
    private configService: ConfigService,
    private authservice: AuthService) { }

  ngOnInit() {
    this.siteName = this.configService.siteName;
    this.userLoggedIn = this.authservice.UserLoggedIn;
  }

}

