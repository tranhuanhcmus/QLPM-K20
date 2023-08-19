// Import necessary modules and functions
import { useGetCouponMutation } from "../../fetching/mutation";
import { useOrderContext } from "../context";

export const useGetCoupon = () => {
  const { state, dispatch } = useOrderContext();
  const getCouponMutation = useGetCouponMutation();

  const onGetCoupon = (coupon) => {
    return new Promise((resolve, reject) => {
      const accessToken = state.accessToken;
      if (accessToken) {
        getCouponMutation
          .mutateAsync({
            accessToken,
            couponCode: coupon,
          })
          .then((res) => {
            if (state.order) {
              dispatch({
                type: "SET_ORDER",
                payload: {
                  ...state.order,
                  coupon: res.coupon,
                },
              });
            }
            resolve(res.coupon);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject(new Error("Authorization token is not valid"));
      }
    });
  };

  return {
    onGetCoupon,
    isLoading: getCouponMutation.isLoading,
  };
};
