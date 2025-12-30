import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name Must Be At Least 2 Characters Long"),
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(6, "Password Must Be At Least 6 Characters Long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(6, "Password Must Be At Least 6 Characters Long"),
});
