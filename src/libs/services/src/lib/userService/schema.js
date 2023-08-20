import z from "zod";

const getUserDetailSchema = z.object({
  chest: z.number(),
  waist: z.number(),
  hip: z.number(),
  neck: z.number(),
  armhole: z.number(),
  pants_circum: z.number(),
  shoulder: z.number(),
  sleeve_length: z.number(),
  jacket_length: z.number(),
  pants_waist: z.number(),
  crotch: z.number(),
  thigh: z.number(),
  pants_length: z.number(),
});

const updateUserDetailSchema = z.object({});

export { getUserDetailSchema, updateUserDetailSchema };
