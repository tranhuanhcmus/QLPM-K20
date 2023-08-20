import { Services } from "../../service";
import { getCheckoutUrlSchema } from "./schema";

export class CheckoutService extends Services {
  abortController;

  getUrlCheckoutUrl = "/payment";

  getCheckoutUrl = async ({ accessToken, totalPay }) => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "POST",
        url: this.getUrlCheckoutUrl,
        schema: getCheckoutUrlSchema,
        params: {
          totalPay,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
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
