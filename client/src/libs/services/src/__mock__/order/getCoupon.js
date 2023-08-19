import { axiosMockAdapterInstance } from "../../config/axios";
import { OrderService } from "../../lib";
import couponData from "../data/coupon.json";
import { getApiUrl } from "../../config/url";

axiosMockAdapterInstance
  .onGet(getApiUrl(false) + new OrderService().getCouponUrl)
  .reply((config) => {
    const token = config.headers?.Authorization.replace("Bearer ", "");

    if (token) {
      const couponCode = config.params.coupon;
      if (typeof couponCode !== "string") return [401, "Invalid coupon"];
      const couponResult = couponData.find((t) =>
        t.code.includes(couponCode.toLowerCase())
      );
      if (couponResult) {
        return [
          200,
          {
            coupon: couponResult.value,
          },
        ];
      } else {
        return [
          404,
          {
            message: "Cannot find coupon",
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
