import { isDevelopment } from "./axios";
import { authServiceConfig } from "./config";

export const getApiUrl = (isProduction) => {
  // Manual
  if (isProduction) {
    return "https://sunrise-hotel.azurewebsites.net/api";
  }
  // Automatic
  if (isDevelopment() && authServiceConfig.isMockApi) {
    return "http://localhost:3000/api";
  } else {
    return "https://sunrise-hotel.azurewebsites.net/api";
  }
};
