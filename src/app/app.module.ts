import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MsalModule, MsalService, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { AppRoutingModule } from './app-routing.module';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '58869538-0ab5-4b2f-bd66-1e768948f359', // Replace with your Client ID
      authority: 'https://login.microsoftonline.com/887aa0fa-80f4-4405-b6f0-91b25cfe11c0', // Replace with your Tenant ID
      redirectUri: 'https://pacewisdomsolutions.sharepoint.com/:f:/r/sites/MMSH/Shared%20Documents/LINK/Document%20Upload' // Replace with your actual redirect URI
    }
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect, // Set interaction type (Popup or Redirect)
    authRequest: {
      scopes: ['user.read'] // Define scopes here
    }
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect, // Popup or Redirect
    protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', ['user.read']], // Example API
      // Add more protected resources here
    ])
  };
}

export function initializeApp(msalService: MsalService): () => Promise<void> {
  return () => msalService.instance.initialize(); // Initialize the MSAL application here
}

@NgModule({
  declarations: [AppComponent, HomeComponent, UploadComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MsalModule.forRoot(MSALInstanceFactory(), MSALGuardConfigFactory(), MSALInterceptorConfigFactory()),
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [MsalService],
      multi: true, // Ensures that MSAL is initialized before the app starts
    },
    MsalService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
