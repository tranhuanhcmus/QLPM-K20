import { isAxiosError } from "../../config/axios";
import { Services } from "../../service";
import { getUserDetailSchema, updateUserDetailSchema } from "./schema";

const unknownErrorMsg = "Order service unknown error";

export class UserService extends Services {
  abortController;

  getUserDetailUrl = "/measure";
  updateUserDetailUrl = "/measure";

  getUserDetail = async ({ accessToken }) => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "GET",
        url: this.getUserDetailUrl,
        schema: getUserDetailSchema,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      return response;
    } catch (error) {
      if (this.isCancel(error)) {
        // Handle other errors
        throw error;
      } else if (isAxiosError(error)) {
        throw new Error(
          error.response ? error.response.data.message : unknownErrorMsg
        );
      }
      throw new Error(unknownErrorMsg);
    }
  };
  updateUserDetail = async ({ accessToken, userDetail }) => {
    this.abortController = new AbortController();
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await this.fetchApi({
        method: "POST",
        url: this.updateUserDetailUrl,
        schema: updateUserDetailSchema,
        data: userDetail,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      return {
        message: "Success",
      };
    } catch (error) {
      if (this.isCancel(error)) {
        // Handle other errors
        throw error;
      } else if (isAxiosError(error)) {
        throw new Error(
          error.response ? error.response.data.message : unknownErrorMsg
        );
      }
      throw new Error(unknownErrorMsg);
    }
  };
}