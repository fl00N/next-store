"use server";

import { redirect } from "next/navigation";
import prisma from "./db";
import { currentUser } from "@clerk/nextjs/server";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";

const renderError = (error: unknown): { message: string; success: boolean } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "There was an error...",
    success: false,
  };
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You need to be logged in!");
  }
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

export const fetchFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const fetchSingleProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    redirect("/products");
  }

  return product;
};

export const createProductAction = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string; success: boolean }> => {
  try {
    const user = await getAuthUser();

    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedData = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image);

    await prisma.product.create({
      data: {
        ...validatedData,
        image: fullPath,
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/admin/products?create=success");
};

export const fetchAdminProducts = async () => {
  await getAdminUser();

  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

export const deleteProductAction = async ({
  productId,
}: {
  productId: string;
}) => {
  await getAdminUser();

  try {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    await deleteImage(product.image);
    return { message: "Product deleted", success: true };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (productId: string) => {
  await getAdminUser();

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    redirect("/admin/products");
  }

  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData,
) => {
  await getAdminUser();

  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);

    const validatedData = validateWithZodSchema(productSchema, rawData);

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedData,
      },
    });

    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product updated successfully", success: true };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData,
) => {
  await getAuthUser();

  try {
    const image = formData.get("image") as File;
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);

    await deleteImage(oldImageUrl);
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: { image: fullPath },
    });

    revalidatePath(`/admin/${productId}/edit`);
    return { message: "Product image updated successfully", success: true };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavouriteId = async ({
  productId,
}: {
  productId: string;
}) => {
  const user = await getAuthUser();

  const favourite = await prisma.favourite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favourite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  favouriteId: string | null;
  productId: string;
}) => {
  try {
    const user = await getAuthUser();
    const { favouriteId, productId } = prevState;

    if (favouriteId) {
      await prisma.favourite.delete({
        where: {
          id: favouriteId,
        },
      });
    } else {
      await prisma.favourite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }

    return {
      message: favouriteId ? "Removed from favourites" : "Added to favourites",
      success: true,
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavourites = async () => {
  const user = await getAuthUser();

  const favourites = await prisma.favourite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });

  return favourites;
};
