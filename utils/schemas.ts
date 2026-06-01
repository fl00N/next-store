import { z, ZodType } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(100, {
      message: "Name must be less than 100 characters",
    }),
  price: z.coerce.number().int().min(1, {
    message: "Price must be a positive number",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 5 && wordCount <= 1000;
    },
    {
      message: "Description must be between 5 and 1000 words",
    },
  ),
  company: z.string().min(4),
  featured: z.coerce.boolean().default(false),
});

const validateImageFile = () => {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = ["image/"];

  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize;
    }, "File size must be less than 1MB!")
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      );
    }, "File must be an image!");
};

export const imageSchema = z.object({
  image: validateImageFile(),
});

export const validateWithZodSchema = <T>(
  schema: ZodType<T>,
  data: unknown,
): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = result.error?.issues.map((error) => error.message);
    throw new Error(errors.join(", "));
  }

  return result.data;
};
