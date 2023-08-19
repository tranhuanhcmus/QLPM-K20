import { axiosMockAdapterInstance } from "../../config/axios";
import { UserService } from "../../lib";
import userRawData from "../data/userDetail.json";
import { getApiUrl } from "../../config/url";

// eslint-disable-next-line no-unused-vars
let userDetailDB = userRawData;
axiosMockAdapterInstance
  .onPost(getApiUrl(false) + new UserService().updateUserDetailUrl)
  .reply((config) => {
    const userData = JSON.parse(config.data);
    console.log("UPDATE: ", userData);
    userDetailDB = userData;
    return [
      200,
      {
        message: "Success",
      },
    ];
  });
