import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import * as Msal from '@azure/msal-browser';
import { msalConfig } from './msal-config';

@Injectable({
  providedIn: 'root'
})
export class SharePointService {
  private app = new Msal.PublicClientApplication({
    auth: {
      clientId: "58869538-0ab5-4b2f-bd66-1e768948f359",
    },
    system: {
      allowNativeBroker: true,
    },
  });


  private isInitialized = false;

  constructor() {
    this.app = new Msal.PublicClientApplication(msalConfig);
  }

  async init() {
    if (this.isInitialized) return;

    try {
      await this.app.initialize();
      let tokenResponse = await this.app.handleRedirectPromise();

      let accountObj;
      if (tokenResponse) {
        accountObj = tokenResponse.account;
      } else {
        accountObj = this.app.getAllAccounts()[0];
      }

      if (accountObj && tokenResponse) {
        console.log("[AuthService.init] Got valid accountObj and tokenResponse");
      } else if (accountObj) {
        console.log("[AuthService.init] User has logged in, but no tokens.");
        try {
          tokenResponse = await this.app.acquireTokenSilent({
            account: this.app.getAllAccounts()[0],
            scopes: ["user.read"]
            
          });
        } catch (err) {
          await this.app.acquireTokenRedirect({ scopes: ["user.read"] });
        }
      } else {
        console.log("[AuthService.init] No accountObject or tokenResponse present. User must now login.");
        await this.app.loginRedirect({ scopes: ["user.read"] });
      }

      this.isInitialized = true;
    } catch (error) {
      console.error("[AuthService.init] Failed to handleRedirectPromise()", error);
    }
  }

  async login() {
    if (!this.isInitialized) {
      await this.init();
    }
    return this.app.loginRedirect({ scopes: ["user.read"] });
  }
}
