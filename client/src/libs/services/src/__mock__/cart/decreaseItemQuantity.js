import { axiosMockAdapterInstance } from "../../config/axios";
import { CartService } from "../../lib";
import cartsData from "../data/cart.json";
import { getApiUrl } from "../../config/url";

axiosMockAdapterInstance
  .onDelete(getApiUrl(false) + new CartService().decreaseItemQuantityUrl)
  .reply((config) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    if (token) {
      const productID = config.params.productId;
      const quantity = config.params.quantity;
      let cartDataTest = cartsData[0];
      if (cartDataTest) {
        cartDataTest = cartDataTest.filter((p) => {
          if (p.item.id === productID) {
            if (p.quantity > quantity) {
              p.quantity -= quantity;
              return true;
            } else {
              return false;
            }
          }
          return true;
        });
        return [
          200,
          {
            message: `Delete product with ID: ${productID} from cart successfully`,
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
