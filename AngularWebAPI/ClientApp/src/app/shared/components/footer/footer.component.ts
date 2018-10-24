import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  
  get siteName() { return this.configService.siteName; }

  constructor(private configService: ConfigService) {
  }
}
