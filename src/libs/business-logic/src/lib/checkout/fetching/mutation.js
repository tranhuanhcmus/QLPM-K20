import { CheckoutService } from "../../../../../services/src";
import { useMutation } from "@tanstack/react-query";
import { mutationConfig } from "../../../configs";

// Initialize CartService
const checkoutService = new CheckoutService();

export const useGetCheckoutUrlMutation = () => {
  return useMutation(checkoutService.getCheckoutUrl, {
    retry: mutationConfig.RETRY,
  });
};
