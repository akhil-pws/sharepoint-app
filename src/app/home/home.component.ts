import { Component } from '@angular/core';
import { SharePointService } from '../SharepointService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private sharePointService: SharePointService
  ) { }

  login() {
    this.sharePointService.login();
  }
}
