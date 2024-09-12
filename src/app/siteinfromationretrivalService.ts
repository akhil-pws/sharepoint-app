import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class SharePointService {
  private graphClient: Client;

  constructor(private msalService: MsalService) {
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(this.msalService.instance as PublicClientApplication, {
      account: this.msalService.instance.getActiveAccount()!,
      scopes: ['Files.ReadWrite.All', 'Sites.ReadWrite.All'],
      interactionType: InteractionType.Popup
    });

    this.graphClient = Client.initWithMiddleware({ authProvider });
  }

  async getSiteId(siteUrl: string): Promise<string> {
    const response = await this.graphClient.api('/sites')
      .filter(`siteCollection/root/webUrl eq '${siteUrl}'`)
      .get();
    
    if (response.value && response.value.length > 0) {
      return response.value[0].id;
    }
    throw new Error('Site not found');
  }

  async getDriveId(siteId: string): Promise<string> {
    const response = await this.graphClient.api(`/sites/${siteId}/drives`)
      .get();
    
    if (response.value && response.value.length > 0) {
      return response.value[0].id;
    }
    throw new Error('Drive not found');
  }

  async getFolderId(siteId: string, driveId: string, folderPath: string): Promise<string> {
    try {
      const response = await this.graphClient.api(`/sites/${siteId}/drives/${driveId}/root:/${folderPath}`)
        .get();
      
      return response.id;
    } catch (error) {
      console.error('Error getting folder ID:', error);
      throw new Error('Folder not found');
    }
  }

  async getSharePointFolderId(siteUrl: string, folderPath: string): Promise<string> {
    try {
      const siteId = await this.getSiteId(siteUrl);
      const driveId = await this.getDriveId(siteId);
      const folderId = await this.getFolderId(siteId, driveId, folderPath);
      return folderId;
    } catch (error) {
      console.error('Error getting SharePoint folder ID:', error);
      throw error;
    }
  }

  // ... (keep the existing uploadFile and readFileContent methods)
}