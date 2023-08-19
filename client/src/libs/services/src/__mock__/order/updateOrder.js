import { axiosMockAdapterInstance } from "../../config/axios";
import { OrderService } from "../../lib";
// import ordersRawData from "../data/order.json";
import { getApiUrl } from "../../config/url";

// const orderData = ordersRawData;
axiosMockAdapterInstance
  .onPost(getApiUrl(false) + new OrderService().updateOrderUrl)
  .reply((config) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");
    // const data = JSON.parse(config.data);

    if (token) {
      return [
        200,
        {
          message: "Update success",
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
