export const authServiceConfig = {
  isMockApi: true
};
export const googleApiConfig = {
  getUserInforUrl: "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses",
  validateTokenUrl: "https://www.googleapis.com/oauth2/v3/tokeninfo"
}
export const facebookApiConfig = {
  getFBAccessTokenUrl: "https://graph.facebook.com/v17.0/oauth/access_token",
  getFBUserInforUrl: "https://graph.facebook.com/me?fields=first_name,last_name,email"
}

