import z from "zod";

const getUserDetailSchema = z.object({
  name: z.string(),
  height: z.number().optional(),
  weight: z.number().optional(),
  age: z.number().optional(),
  chest: z.number().optional(),
  waist: z.number().optional(),
  hip: z.number().optional(),
  neck: z.number().optional(),
  armhole: z.number().optional(),
  pants_circum: z.number().optional(),
  shoulder: z.number().optional(),
  sleeve_length: z.number().optional(),
  jacket_length: z.number().optional(),
  pants_waist: z.number().optional(),
  crotch: z.number().optional(),
  thigh: z.number().optional(),
  pants_length: z.number().optional(),
});

const updateUserDetailSchema = z.object({
  message: z.string(),
});

export { getUserDetailSchema, updateUserDetailSchema };
