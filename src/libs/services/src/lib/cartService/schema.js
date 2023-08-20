import z from "zod";

// Schema for IMessageResponse
const messageResponseSchema = z.object({
  message: z.string(),
});

// Schema for ICart
const cartSchema = z.array(
  z.object({
    item: z.object({
      id: z.number(),
      price: z.number(),
      image: z.string().url(),
      name: z.string(),
      description: z.string(),
      discount: z.number(),
      fabric: z.number(),
      fabricName: z.string(),
      color: z.string(),
      type: z.string(),
    }),
    quantity: z.number(),
  })
);

export { messageResponseSchema, cartSchema };
