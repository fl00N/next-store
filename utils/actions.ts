"use server";

import { redirect } from "next/navigation";
import prisma from "./db";
import { currentUser, auth } from "@clerk/nextjs/server";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { ca } from "zod/v4/locales";
import { Cart } from "@/lib/generated/prisma/client";

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
  pathname: string;
}) => {
  try {
    const user = await getAuthUser();
    const { favouriteId, productId, pathname } = prevState;

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
    revalidatePath(pathname);
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

export const createReviewAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const user = await getAuthUser();
    const rawData = Object.fromEntries(formData);

    const validatedData = validateWithZodSchema(reviewSchema, rawData);

    await prisma.review.create({
      data: {
        ...validatedData,
        clerkId: user.id,
      },
    });

    revalidatePath(`/products/${validatedData.productId}`);
    return { message: "Review submitted successfully", success: true };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async ({
  productId,
}: {
  productId: string;
}) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export const fetchProductRating = async (productId: string) => {
  const result = await prisma.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });

  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();

  const reviews = await prisma.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      clerkId: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });

  return reviews;
};

export const deleteReviewAction = async ({
  reviewId,
}: {
  reviewId: string;
}) => {
  const user = await getAuthUser();

  try {
    await prisma.review.delete({
      where: { id: reviewId, clerkId: user.id },
    });

    return { message: "Review successfully deleted", success: true };
  } catch (error) {
    return renderError(error);
  }
};

export const findExistingReview = async (userId: string, productId: string) => {
  return prisma.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
};

export const fetchCartItems = async () => {
  const { userId } = auth();

  const cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });

  return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });

  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }

  return cart;
};

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  let cartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });

  if (cartItem) {
    cartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: { amount: cartItem.amount + amount },
    });
  } else {
    cartItem = await prisma.cartItem.create({
      data: {
        amount,
        productId,
        cartId,
      },
    });
  }
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }

  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
  });

  return { currentCart, cartItems };
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  try {
    const user = await getAuthUser();
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));
    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount });
    await updateCart(cart);

    return { message: "Added to cart", success: true };
  } catch (error) {
    return renderError(error);
  }
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const user = await getAuthUser();
    const cartItemId = formData.get("id") as string;
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    await updateCart(cart);
    return { message: "Item removed from cart", success: true };
  } catch (error) {
    return renderError(error);
  }
};
export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  try {
    const user = await getAuthUser();
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    await prisma.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Cart updated", success: true };
  } catch (error) {
    return renderError(error);
  }
};

export const createOrderAction = async () => {
  let cartId: null | string = null;
  let orderId: null | string = null;

  try {
    const user = await getAuthUser();

    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    cartId = cart.id;

    const order = await prisma.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }

  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();

  const orders = await prisma.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const fetchAdminOrders = async () => {
  await getAdminUser();

  const orders = await prisma.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};
