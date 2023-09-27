import { z } from "zod";

export const schemaNewProduct = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().nonempty("Category is required"),
  image: z.string().nonempty("Image is required"),
});

export const schemaEditProduct = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
});
