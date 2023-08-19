import { AuthProvider } from "../lib/auth/process/provider";
import { CartProvider } from "../lib/cart/process/provider";
import { OrderProvider } from "../lib/order/process/provider";
import { CheckoutProvider } from "../lib/checkout/process/provider";
import { UserProvider } from "../lib/user/process/provider";

export const authConfig = {
  isNeedRefreshToken: true,
  isNeedBroadcast: true,
};
export const mutationConfig = {
  RETRY: 1,
};

export const providerConfig = [
  {
    key: "user",
    provider: UserProvider,
    isActive: true,
  },
  {
    key: "checkout",
    provider: CheckoutProvider,
    isActive: false,
  },
  {
    key: "order",
    provider: OrderProvider,
    isActive: true,
  },
  {
    key: "cart",
    provider: CartProvider,
    isActive: true,
  },
  {
    key: "auth",
    provider: AuthProvider,
    isActive: true,
  },
];

export const googleConfig = {
  AUTH_URI: "https://accounts.google.com/o/oauth2/auth",
  TOKEN_URI: "https://oauth2.googleapis.com/token",
  AUTH_PROVIDER_X509_CERT_URL: "https://www.googleapis.com/oauth2/v1/certs",
  SCOPE:
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
};

export const facebookConfig = {
  AUTH_URI: "https://www.facebook.com/v17.0/dialog/oauth",
  SCOPE: "public_profile,email",
  STATE: "{st=datsuperman04102014helloanhLong,ds=2789562897562}",
};
