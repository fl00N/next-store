"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ProductCreatedToast = ({ showToast }: { showToast: boolean }) => {
  const router = useRouter();
  const shown = useRef(false);

  useEffect(() => {
    if (!showToast || shown.current) return;

    shown.current = true;

    toast.success("Product created!", {
      id: "product-created",
    });

    router.replace("/admin/products");
  }, []);

  return null;
};
