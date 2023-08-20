// Import necessary modules and functions
import { debouncePromise } from "../../../../helper";
import { useGetShippingMutation } from "../../fetching/mutation";
import { useOrderContext } from "../context";

const debounceDelayTime = 1000;
export const useGetShipping = () => {
  const { state, dispatch } = useOrderContext();
  const getShippingMutation = useGetShippingMutation();

  const onGetShipping = debouncePromise((address) => {
    return new Promise((resolve, reject) => {
      const accessToken = state.accessToken;
      if (accessToken) {
        if (!address.length) {
          state.order &&
            dispatch({
              type: "SET_ORDER",
              payload: {
                ...state.order,
                shipping: 0,
              },
            });
          resolve(0);
        } else {
          getShippingMutation
            .mutateAsync({
              accessToken,
              address,
            })
            .then((res) => {
              state.order &&
                dispatch({
                  type: "SET_ORDER",
                  payload: {
                    ...state.order,
                    shipping: res.shipping,
                  },
                });
              resolve(res.shipping);
            })
            .catch((err) => {
              reject(err);
            });
        }
      } else {
        reject(new Error("Authorization token is not valid"));
      }
    });
  }, debounceDelayTime);

  return {
    onGetShipping,
    isLoading: getShippingMutation.isLoading,
  };
};
