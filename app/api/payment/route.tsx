import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { type NextRequest } from "next/server";
import prisma from "@/utils/db";

const toCents = (amount: number) => Math.round(amount * 100);

export const POST = async (req: NextRequest) => {
  const reqHeaders = new Headers(req.headers);
  const origin = reqHeaders.get("origin");

  const { orderId, cartId, theme } = await req.json();

  const checkoutTheme = theme === "dark" ? "dark" : "light";
  const isDark = checkoutTheme === "dark";

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order || !cart) {
    return Response.json(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  const productLineItems = cart.cartItems.map((cartItem) => {
    return {
      quantity: cartItem.amount,
      price_data: {
        currency: "gbp",
        product_data: {
          name: cartItem.product.name,
          images: [cartItem.product.image],
        },
        unit_amount: cartItem.product.price * 100,
      },
    };
  });

  const taxInCents = toCents(order.tax);
  const shippingInCents = toCents(order.shipping);

  const line_items = [
    ...productLineItems,

    ...(taxInCents > 0
      ? [
          {
            quantity: 1,
            price_data: {
              currency: "gbp" as const,
              product_data: {
                name: "Tax",
              },
              unit_amount: taxInCents,
            },
          },
        ]
      : []),
  ];

  const shipping_options: Stripe.Checkout.SessionCreateParams.ShippingOption[] =
    shippingInCents > 0
      ? [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              display_name: "Standard shipping",
              fixed_amount: {
                amount: shippingInCents,
                currency: "gbp",
              },
            },
          },
        ]
      : [];

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded_page",
      branding_settings: {
        border_style: "rounded",
        background_color: isDark ? "#020817" : "#FFFFFF",
      },
      metadata: { orderId, cartId },
      mode: "payment",
      line_items,
      shipping_options,
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);

    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
