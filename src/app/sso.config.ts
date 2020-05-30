import {AuthConfig} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/index.html',

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: environment.googleClientId,

  // set the scope for the permissions the client should request
  scope: 'openid profile email',

  showDebugInformation: true,

  // Google does not conform to this and it is not in the specs as per
  // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/419
  strictDiscoveryDocumentValidation: false,


};
