// Import necessary modules and functions
import { useOrderContext } from "../context";
import { getOrderLocalStorage } from "../helpers/localStorageOrder";

export const useGetOrder = () => {
  const { state } = useOrderContext();
  const localOrder = getOrderLocalStorage();

  return !state.order && localOrder ? localOrder : state.order;
};
