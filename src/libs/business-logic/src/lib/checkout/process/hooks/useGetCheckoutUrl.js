// Importing necessary modules and functions
import { useGetCheckoutUrlMutation } from "../../fetching/mutation";
import { useCheckoutContext } from "../context/checkoutContext";

export const useGetCheckoutUrl = () => {
  const { state } = useCheckoutContext();
  const getCheckoutUrlMutation = useGetCheckoutUrlMutation();

  const onGetCheckoutUrl = (totalPay) => {
    return new Promise((resolve, reject) => {
      if (!state.accessToken) {
        // NOT LOGGED IN
        reject("Unauthorized");
      } else {
        getCheckoutUrlMutation
          .mutateAsync({ accessToken: state.accessToken, totalPay })
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  };

  return {
    onGetCheckoutUrl,
    isLoading: getCheckoutUrlMutation.isLoading,
  };
};
