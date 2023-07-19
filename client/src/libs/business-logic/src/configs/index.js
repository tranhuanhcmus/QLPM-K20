import { AuthProvider } from "../lib/auth/process/provider";
import { CartProvider } from "../lib/cart/process/provider";

export const authConfig = {
  isNeedRefreshToken: true,
  isNeedBroadcast: true
};

export const providerConfig = [
  {
    key: "auth",
    provider: AuthProvider,
    isActive: true,
    isNeedAccessToken: false,
  },
  {
    key: "cart",
    provider: CartProvider,
    isActive: true,
    isNeedAccessToken: true
  },
];

export const googleConfig = {
  CLIENT_ID: '490941492727-9ojv2i4jejj7ni0a6nt8go90cmiebgb2.apps.googleusercontent.com',
  CLIENT_SECRET: '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',
  PROJECT_ID: 'invoker-392013',
  AUTH_URI: 'https://accounts.google.com/o/oauth2/auth',
  TOKEN_URI: 'https://oauth2.googleapis.com/token',
  AUTH_PROVIDER_X509_CERT_URL: 'https://www.googleapis.com/oauth2/v1/certs',
  REDIRECT_URI: 'http://localhost:3000',
  JAVASCRIPT_ORIGIN: 'http://localhost:3000',
  SCOPE: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
}

export const facebookConfig = {
  AUTH_URI: "https://www.facebook.com/v17.0/dialog/oauth",
  APP_ID: "293243099784310",
  APP_SECRET: "eab7a71d6d8ad872c13ed4ba2c31de1e",
  REDIRECT_URI: "http://localhost:3000/",
  SCOPE: "public_profile,email",
  STATE: "{st=datsuperman04102014helloanhLong,ds=2789562897562}"
}
