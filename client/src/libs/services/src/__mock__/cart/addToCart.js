import { axiosMockAdapterInstance } from "../../config/axios";
import { CartService } from "../../lib";
import cartsDataRaw from "../data/cart.json";
import { getApiUrl } from "../../config/url";

const cartsData = cartsDataRaw;

axiosMockAdapterInstance
  .onPost(getApiUrl(false) + new CartService().addToCartUrl)
  .reply((config) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    const data = JSON.parse(config.data);
    console.log("ADD TO CART: ", data);
    if (token) {
      if (
        !data.item ||
        !data.quantity ||
        data.quantity <= 0 ||
        typeof data.quantity !== "number"
      ) {
        return [
          401,
          {
            message: `Product data is invalid`,
          },
        ];
      }
      if (cartsData[0]) {
        if (Array.isArray(cartsData[0])) {
          if (cartsData[0].length === 0) {
            cartsData[0] = [
              {
                item: data.item,
                quantity: data.quantity,
              },
            ];
          } else {
            cartsData[0].forEach((cp) => {
              if (cp.item.id === data.item.id) {
                cp.quantity += data.quantity;
              }
            });
          }
        }
        return [
          200,
          {
            message: `Add ${data.quantity} product ${data.item.id} to cart successfully`,
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
