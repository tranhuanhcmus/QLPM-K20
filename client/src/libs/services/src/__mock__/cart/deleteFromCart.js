import { axiosMockAdapterInstance } from "../../config/axios";
import { CartService } from "../../lib";
import cartsData from "../data/cart.json";
import { getApiUrl } from "../../config/url";

axiosMockAdapterInstance
  .onDelete(getApiUrl(false) + new CartService().deleteFromCartUrl)
  .reply((config) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    if (token) {
      const productID = config.params.productId;
      let cartDataTest = cartsData[0];
      if (cartDataTest) {
        cartDataTest = cartDataTest.filter((p) => p.item.id !== productID);
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
