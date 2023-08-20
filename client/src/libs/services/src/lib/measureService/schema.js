import z from "zod";

const getFabricSchema = z.array(
  z.object({
    fabricID: z.number(),
    fabricName: z.string(),
    material: z.string(),
    price: z.number(),
    color: z.string(),
    style: z.string(),
    image: z.string(),
    category: z.string(),
    inventory: z.number(),
  })
);
const getImageSchema = z.object({
  id: z.number(),
  front: z.string(),
  back: z.string(),
});

export { getFabricSchema, getImageSchema };
