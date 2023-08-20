import { axiosMockAdapterInstance } from "../../config/axios";
import { CartService } from "../../lib";
import cartsData from "../data/cart.json";
import { getApiUrl } from "../../config/url";

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + new CartService().getCartUrl)
  .reply((config) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    if (token) {
      return cartsData[0]
        ? [200, cartsData[0]]
        : [
            404,
            {
              message: `Cannot find cart`,
            },
          ];
    } else {
      return [
        401,
        {
          message: "Invalid credential",
        },
      ];
    }
  });
