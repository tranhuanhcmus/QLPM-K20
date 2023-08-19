import { axiosMockAdapterInstance } from "../../config/axios";
import { OrderService } from "../../lib";
import taxData from "../data/tax.json";
import { getApiUrl } from "../../config/url";

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + new OrderService().getTaxUrl)
  .reply((config) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");

    if (token) {
      const countryName = config.params.country;
      if (typeof countryName !== "string") return [401, "Invalid country name"];
      const countryResult = taxData.find((t) =>
        t.country.includes(countryName.toLowerCase())
      );
      if (countryResult) {
        return [
          200,
          {
            tax: countryResult.tax,
          },
        ];
      } else {
        return [
          404,
          {
            message: "Cannot find country",
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
