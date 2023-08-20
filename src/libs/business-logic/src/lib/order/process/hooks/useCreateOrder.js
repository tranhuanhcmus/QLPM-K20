// Import necessary modules and functions
import { useUpdateOrderMutation } from "../../fetching/mutation";
import { useOrderContext } from "../context";
import { useGetOrder } from "./useGetOrder";

export const useCreateOrder = () => {
  const localOrder = useGetOrder();
  const { state, dispatch } = useOrderContext();
  const updateOrderMutation = useUpdateOrderMutation();

  const onCreateOrder = (order) => {
    return new Promise((resolve, reject) => {
      const accessToken = state.accessToken;
      const needUpdateOrder = order ? order : localOrder;
      if (!accessToken) reject(new Error("Authorization token is not valid"));
      else if (!needUpdateOrder) reject(new Error("Order is not valid"));
      else {
        updateOrderMutation
          .mutateAsync({
            accessToken,
            order: needUpdateOrder,
          })
          .then((res) => {
            dispatch({
              type: "SET_ORDER",
              payload: needUpdateOrder,
            });
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  };

  return {
    onCreateOrder,
    isLoading: updateOrderMutation.isLoading,
  };
};
