// Import necessary modules and functions
import { useGetTaxMutation } from "../../fetching/mutation";
import { useOrderContext } from "../context";

export const useGetTax = () => {
  const { state, dispatch } = useOrderContext();
  const getTaxMutation = useGetTaxMutation();

  const onGetTax = (country) => {
    return new Promise((resolve, reject) => {
      const accessToken = state.accessToken;
      if (accessToken) {
        getTaxMutation
          .mutateAsync({
            accessToken,
            country,
          })
          .then((res) => {
            state.order &&
              dispatch({
                type: "SET_ORDER",
                payload: {
                  ...state.order,
                  tax: res.tax,
                },
              });
            resolve(res.tax);
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
    onGetTax,
    isLoading: getTaxMutation.isLoading,
  };
};
