import { axiosMockAdapterInstance } from "../../config/axios";
import { OrderService } from "../../lib";
import { getApiUrl } from "../../config/url";

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + new OrderService().getShippingUrl)
  .reply((config) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");

    if (token) {
      const address = config.params.address;
      if (typeof address !== "string") return [401, "Invalid address"];
      else {
        const randomShipping = Math.floor(
          Math.random() * (100000 - 10000 + 1) + 10000
        );
        return [
          200,
          {
            shipping: randomShipping,
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
