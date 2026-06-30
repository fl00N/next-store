"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useTheme } from "next-themes";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);

const CheckoutPage = () => {
  const searchParams = useSearchParams();

  const cartId = searchParams.get("cartId");
  const orderId = searchParams.get("orderId");
  const { resolvedTheme } = useTheme();

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await axios.post("/api/payment", {
        cartId,
        orderId,
        theme: resolvedTheme,
      });

      return response.data.clientSecret;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Payment API error:", {
          status: error.response?.status,
          data: error.response?.data,
        });
      }

      throw error;
    }
  }, [cartId, orderId, resolvedTheme]);

  const options = useMemo(
    () => ({
      fetchClientSecret,
    }),
    [fetchClientSecret],
  );

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        key={resolvedTheme}
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutPage;
