"use client";

import { actionFunction } from "@/utils/types";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialState = { message: "", success: false };

type FormContainerProps = {
  action: actionFunction;
  children: React.ReactNode;
  refreshOnSuccess?: boolean;
  addedToCart?: boolean;
  onSuccess?: () => void;
};

const FormContainer = ({
  action,
  children,
  refreshOnSuccess = false,
  addedToCart = false,
  onSuccess,
}: FormContainerProps) => {
  const [state, formAction] = useFormState(action, initialState);
  const router = useRouter();

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message, {
        cancel: {
          label: addedToCart ? "Go to cart" : "Cancel",
          onClick: addedToCart ? () => router.push("/cart") : () => {},
        },
      });

      onSuccess?.();

      if (refreshOnSuccess) {
        router.refresh();
      }
    } else {
      toast.error(state.message, {
        cancel: { label: "Cancel", onClick: () => {} },
      });
    }
  }, [
    state.message,
    state.success,
    refreshOnSuccess,
    addedToCart,
    router,
    onSuccess,
  ]);

  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
