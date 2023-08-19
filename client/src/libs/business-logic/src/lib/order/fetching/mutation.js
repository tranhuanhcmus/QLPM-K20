import { OrderService } from "../../../../../services/src";
import { useMutation } from "@tanstack/react-query";
import { mutationConfig } from "../../../configs";

const orderService = new OrderService();

export const useGetOrderMutation = () => {
  return useMutation(orderService.getOrder, {
    retry: mutationConfig.RETRY,
  });
};
export const useGetShippingMutation = () => {
  return useMutation(orderService.getShipping, {
    retry: mutationConfig.RETRY,
  });
};
export const useGetTaxMutation = () => {
  return useMutation(orderService.getTax, {
    retry: mutationConfig.RETRY,
  });
};
export const useGetCouponMutation = () => {
  return useMutation(orderService.getCoupon, {
    retry: mutationConfig.RETRY,
  });
};
export const useUpdateOrderMutation = () => {
  return useMutation(orderService.createOrder, {
    retry: mutationConfig.RETRY,
  });
};
