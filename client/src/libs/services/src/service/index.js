import { axios, getAxiosNormalInstance, isCancel } from "../config/axios";
import { getApiUrl } from "../config/url";

export class Services {
  url;
  abortController;
  axios;
  productionAxios;

  constructor() {
    this.axios = axios;
    this.productionAxios = getAxiosNormalInstance();
  }

  isCancel(error) {
    return isCancel(error);
  }

  cancelRequest() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  async fetchApi({
    method,
    url,
    schema,
    params,
    data,
    headers = {},
    signal,
    transformResponse,
    isProduction,
  }) {
    const mockParams = {
      method,
      url: getApiUrl(isProduction) + url,
      data,
      params,
      headers,
      signal,
    };
    const response = await (!isProduction
      ? this.axios(mockParams)
      : this.productionAxios(mockParams));
    const dataResponse = schema.parse(response.data);
    return transformResponse ? transformResponse(dataResponse) : dataResponse;
  }
}
