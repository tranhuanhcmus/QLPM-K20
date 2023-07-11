import { axiosMockAdapterInstance } from "../config/axios";
import { AuthService } from "../lib";

axiosMockAdapterInstance
  .onPost(new AuthService().refreshTokenUrl)
  .reply((config) => {
    // const token = config.headers?.Authorization.replace("Bearer ", "");
    return [
      200,
      {
        message: "Token verified",
        token: "This is refresh token"
      }
    ];
  });
