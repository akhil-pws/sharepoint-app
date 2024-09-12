import { Configuration } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '58869538-0ab5-4b2f-bd66-1e768948f359',
    authority: 'https://login.microsoftonline.com/887aa0fa-80f4-4405-b6f0-91b25cfe11c0',
    redirectUri: 'http://localhost:4200/'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
};