import z from "zod";

const getShippingResponseSchema = z.object({
  shipping: z.number(),
});

const getOrderTaxResponseSchema = z.object({
  tax: z.number(),
});

const getCouponResponseSchema = z.object({
  coupon: z.number(),
});

const updateOrderResponseSchema = z.object({
  message: z.string(),
});

export {
  getShippingResponseSchema,
  getOrderTaxResponseSchema,
  getCouponResponseSchema,
  updateOrderResponseSchema,
};
