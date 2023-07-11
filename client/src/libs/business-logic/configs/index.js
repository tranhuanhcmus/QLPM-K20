import { AuthProvider } from "../lib/auth/process/provider";

export const authConfig = {
  isNeedRefreshToken: true
};

export const providerConfig = [
  {
    key: "auth",
    provider: AuthProvider,
    isActive: true
  }
];
