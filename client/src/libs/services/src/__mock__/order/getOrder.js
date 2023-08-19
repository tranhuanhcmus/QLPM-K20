import { axiosMockAdapterInstance } from "../../config/axios";
import { OrderService } from "../../lib";
import cartRawData from "../data/cart.json";
import ordersRawData from "../data/order.json";
import { getApiUrl } from "../../config/url";

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + new OrderService().getOrderUrl)
  .reply((config) => {
    const cart = cartRawData[0];
    const orders = ordersRawData;
    orders.orderItem = cart;
    const token = config.headers?.Authorization.replace("Bearer ", "");
    if (token) {
      return orders
        ? [
            200,
            {
              orders,
            },
          ]
        : [
            404,
            {
              message: "Cannot find order",
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
