import { z } from "zod";

export const editProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  description: z
    .string()
    .max(200, "Description cannot be longer than 200 characters"),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image size must be less than 5MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      "Only JPEG, PNG, and GIF formats are allowed"
    )
    .optional(),
});
