import { axiosMockAdapterInstance } from "../../config/axios";
import { CartService } from "../../lib";
import cartsData from "../data/cart.json";
import { getApiUrl } from "../../config/url";

let cartDataTest = cartsData[0];
axiosMockAdapterInstance
  .onDelete(getApiUrl(false) + new CartService().clearCartUrl)
  .reply((config) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    if (token) {
      if (cartDataTest) {
        cartDataTest = [];
        return [
          200,
          {
            message: `Clear cart successfully`,
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
          message: `Invalid credential`,
        },
      ];
    }
  });
