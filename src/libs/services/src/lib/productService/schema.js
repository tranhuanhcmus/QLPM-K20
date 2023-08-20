import z from "zod";

const getProductByCategorySchema = z.array(
  z.object({
    id: z.number(),
    price: z.number(),
    image: z.string(),
    name: z.string(),
    description: z.string(),
    discount: z.number(),
    fabric: z.number(),
    fabricName: z.string(),
    color: z.string(),
    type: z.string(),
  })
);

export { getProductByCategorySchema };
