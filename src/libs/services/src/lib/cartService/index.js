import { isAxiosError } from "../../config/axios";
import { Services } from "../../service";
import { cartSchema, messageResponseSchema } from "./schema";

const unknownErrorMessage = "Cart service unknown error";
export class CartService extends Services {
  abortController;

  addToCartUrl = "/cart/add";
  updateCartUrl = "/cart/update-all";
  deleteFromCartUrl = "/cart/item";
  decreaseItemQuantityUrl = "/cart/item-num";
  clearCartUrl = "/cart/clear";
  getCartUrl = "/cart/get";

  addToCart = async (params) => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "POST",
        url: this.addToCartUrl,
        schema: messageResponseSchema,
        data: {
          item: params.item,
          quantity: params.quantity,
        },
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      return response;
    } catch (error) {
      if (!this.isCancel(error)) {
        // Check if it's cannot refresh error?
        if (isAxiosError(error)) {
          throw new Error(
            error.response ? error.response.data.message : unknownErrorMessage
          );
        }
        throw new Error(unknownErrorMessage);
      }
      console.error(error);
      return { message: unknownErrorMessage };
    }
  };
  updateCart = async (params) => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "PUT",
        url: this.updateCartUrl,
        schema: messageResponseSchema,
        data: params.cart,
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      return response;
    } catch (error) {
      if (!this.isCancel(error)) {
        // Check if it's cannot refresh error?
        if (isAxiosError(error)) {
          throw new Error(
            error.response ? error.response.data.message : unknownErrorMessage
          );
        }
        throw new Error(unknownErrorMessage);
      }
      console.error(error);
      return { message: unknownErrorMessage };
    }
  };
  deleteFromCart = async (params) => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "DELETE",
        url: this.deleteFromCartUrl,
        schema: messageResponseSchema,
        params: {
          productId: params.productId,
        },
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      return response;
    } catch (error) {
      if (!this.isCancel(error)) {
        // Check if it's cannot refresh error?
        if (isAxiosError(error)) {
          throw new Error(
            error.response ? error.response.data.message : unknownErrorMessage
          );
        }
        throw new Error(unknownErrorMessage);
      }
      console.error(error);
      return { message: unknownErrorMessage };
    }
  };
  decreaseItemQuantity = async (params) => {
    this.abortController = new AbortController();
    try {
      console.log("params: ", params);
      const response = await this.fetchApi({
        method: "DELETE",
        url: this.decreaseItemQuantityUrl,
        schema: messageResponseSchema,
        params: {
          productId: params.productId,
          number: params.quantity,
        },
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      console.log("response: ", response);
      return response;
    } catch (error) {
      if (!this.isCancel(error)) {
        // Check if it's cannot refresh error?
        if (isAxiosError(error)) {
          throw new Error(
            error.response ? error.response.data.message : unknownErrorMessage
          );
        }
        throw new Error(unknownErrorMessage);
      }
      console.error(error);
      return { message: unknownErrorMessage };
    }
  };
  clearCart = async (params) => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "DELETE",
        url: this.clearCartUrl,
        schema: messageResponseSchema,
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      return response;
    } catch (error) {
      if (!this.isCancel(error)) {
        // Check if it's cannot refresh error?
        if (isAxiosError(error)) {
          throw new Error(
            error.response ? error.response.data.message : unknownErrorMessage
          );
        }
        throw new Error(unknownErrorMessage);
      }
      console.error(error);
      return { message: unknownErrorMessage };
    }
  };
  getCart = async (params) => {
    this.abortController = new AbortController();
    try {
      const response = await this.fetchApi({
        method: "GET",
        url: this.getCartUrl,
        schema: cartSchema,
        headers: {
          Authorization: `Bearer ${params}`,
        },
        signal: this.abortController.signal,
        transformResponse: (res) => res,
        isProduction: true,
      });
      return response;
    } catch (error) {
      if (!this.isCancel(error)) {
        // Check if it's cannot refresh error?
        if (isAxiosError(error)) {
          throw new Error(
            error.response ? error.response.data.message : unknownErrorMessage
          );
        }
        throw new Error(unknownErrorMessage);
      }
      console.error(error);
      return { message: unknownErrorMessage };
    }
  };
}
