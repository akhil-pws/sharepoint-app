import { Component } from '@angular/core';
import { SharePointService } from '../SharepointService';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  constructor(
    private sharePointService: SharePointService
  ) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const folderUrl = 'https://pacewisdomsolutions.sharepoint.com/:f:/r/sites/MMSH/Shared%20Documents/LINK/Document%20Upload'; // Change this to your folder path

    if (file) {
      // this.sharePointService.uploadFileToSharePoint(file, folderUrl);
    }
  }
}
