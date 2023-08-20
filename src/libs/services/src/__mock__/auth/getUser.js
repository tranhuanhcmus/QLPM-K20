import { axiosMockAdapterInstance } from "../../config/axios";
import { AuthService } from "../../lib";
import userData from "../data/user.json";
import { getApiUrl } from "../../config/url";

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + new AuthService().getUserUrl)
  .reply((config) => {
    return [200, userData];
  });
