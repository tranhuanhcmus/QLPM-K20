import { axiosMockAdapterInstance } from "../../config/axios";
import { CartService } from "../../lib";
import cartsData from "../data/cart.json";
import { getApiUrl } from "../../config/url";

let cartDataTest = cartsData[0];
axiosMockAdapterInstance
  .onPut(getApiUrl(false) + new CartService().updateCartUrl)
  .reply((config) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    const data = JSON.parse(config.data);
    console.log("UPDATE CART: ", data);
    if (token) {
      if (!data.cart) {
        return [
          401,
          {
            message: `Cart data is invalid or not exist!`,
          },
        ];
      } else if (cartDataTest) {
        cartDataTest = data.cart;
        return [
          200,
          {
            message: `Update cart with ${data.cart.length} products successfully`,
          },
        ];
      } else {
        return [
          404,
          {
            message: `Cannot find cart`,
          },
        ];
      }
    } else {
      return [
        401,
        {
          message: "Invalid credential",
        },
      ];
    }
  });
