import { Component, OnInit } from '@angular/core';
import { SharePointService } from './SharepointService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private sharePointService: SharePointService
  ) { }

  async ngOnInit() {
    try {
      await this.sharePointService.init();
    } catch (error) {
      console.error("Initialization failed", error);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const folderUrl = 'https://pacewisdomsolutions.sharepoint.com/:f:/r/sites/MMSH/Shared%20Documents/LINK/Document%20Upload'; // Change this to your folder path

    // if (file) {
    //   this.sharePointService.uploadFileToSharePoint(file, folderUrl);
    // }
  }

  login() {
     this.sharePointService.login();
  }
}
