import { axios, isCancel } from "../config/axios";

export class Services {
  constructor() {
    this.axios = axios;
  }

  isCancel(error) {
    return isCancel(error);
  }

  cancelRequest() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }
}
