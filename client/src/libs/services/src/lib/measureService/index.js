import { Services } from "../../service";
import { getFabricSchema, getImageSchema } from "./schema";

export class MeasureService extends Services {
  abortController;

  getFabricUrl = "/fabric/all";
  getJacketUrl = "/jacket/get-image-custom";
  getPantsUrl = "/pants/get-image-custom";
  getVestUrl = "/vest/get-image-custom";

  getFabric = async () => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "GET",
        url: this.getFabricUrl,
        schema: getFabricSchema,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      return response;
    } catch (error) {
      if (!this.isCancel(error)) {
        // Handle other errors
        console.error("Catch error checkout url ", error);
        throw error;
      }
    }
  };
  getJacket = async (params) => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "GET",
        url: this.getJacketUrl,
        schema: getImageSchema,
        params,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      return response;
    } catch (error) {
      if (!this.isCancel(error)) {
        // Handle other errors
        console.error("Catch error checkout url ", error);
        throw error;
      }
    }
  };
  getPants = async (params) => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "GET",
        url: this.getPantsUrl,
        schema: getImageSchema,
        params,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      return response;
    } catch (error) {
      if (!this.isCancel(error)) {
        // Handle other errors
        console.error("Catch error checkout url ", error);
        throw error;
      }
    }
  };
  getVest = async (params) => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "GET",
        url: this.getVestUrl,
        schema: getImageSchema,
        params,
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      return response;
    } catch (error) {
      if (!this.isCancel(error)) {
        // Handle other errors
        console.error("Catch error checkout url ", error);
        throw error;
      }
    }
  };
}
