import { axiosMockAdapterInstance } from "../../config/axios";
import { UserService } from "../../lib";
import userRawData from "../data/userDetail.json";
import { getApiUrl } from "../../config/url";

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + new UserService().getUserDetailUrl)
  .reply((config) => {
    return [200, userRawData];
  });
