import { CartService } from "../../../../../services/src";
import { useMutation } from "@tanstack/react-query";
import { mutationConfig } from "../../../configs";

// Initialize CartService
const cartService = new CartService();

/**
 * Use this mutation to add to the cart
 */
export const useAddToCartMutation = () => {
  return useMutation(cartService.addToCart, {
    retry: mutationConfig.RETRY,
  });
};

/**
 * Use this mutation to update the cart
 */
export const useUpdateCartMutation = () => {
  return useMutation(cartService.updateCart, {
    retry: mutationConfig.RETRY,
  });
};

/**
 * Use this mutation to delete from the cart
 */
export const useDeleteFromCartMutation = () => {
  return useMutation(cartService.deleteFromCart, {
    retry: mutationConfig.RETRY,
  });
};
export const useDecreaseItemQuantityMutation = () => {
  return useMutation(cartService.decreaseItemQuantity, {
    retry: mutationConfig.RETRY,
  });
};

/**
 * Use this mutation to clear the cart
 */
export const useClearCartMutation = () => {
  return useMutation(cartService.clearCart, {
    retry: mutationConfig.RETRY,
  });
};

/**
 * Use this mutation to get the cart
 */
export const useGetCartMutation = () => {
  return useMutation(cartService.getCart, {
    retry: mutationConfig.RETRY,
  });
};
