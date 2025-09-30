import { z } from "zod";

export const registerUserSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters"),
    role: z.enum(["supplier", "staff"], "Role is required"),
    profile: z.object({
      name: z.string().min(3, "Full name must be at least 3 characters"),
      phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .optional(),
      address: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .optional(),
      avatarUrl: z
        .string()
        .url("Avatar URL must be a valid URL")
        .nullable()
        .optional(),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
