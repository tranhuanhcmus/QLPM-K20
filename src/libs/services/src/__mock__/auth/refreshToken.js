import { axiosMockAdapterInstance } from "../../config/axios";
import { AuthService } from "../../lib";
import { getApiUrl } from "../../config/url";

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + new AuthService().refreshTokenUrl)
  .reply((config) => {
    // const token = config.headers?.Authorization.replace("Bearer ", "");
    return [
      200,
      {
        message: "Token verified",
        token: "This is refresh token",
      },
    ];
  });
