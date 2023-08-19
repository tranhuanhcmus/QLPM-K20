import { isAxiosError } from "../../config/axios";
import { Services } from "../../service";
import { getProductByCategorySchema } from "./schema";

const unknownErrorMsg = "Order service unknown error";

export class ProductService extends Services {
  abortController;

  getProductByCategoryUrl = "/product";

  getProductByCategory = async ({ category }) => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "GET",
        url: this.getProductByCategoryUrl,
        schema: getProductByCategorySchema,
        params: {
          category,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
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
}
