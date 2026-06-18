"use client";

import { actionFunction } from "@/utils/types";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const initialState = { message: "", success: false };

type FormContainerProps = {
  action: actionFunction;
  children: React.ReactNode;
  onSuccess?: () => void;
};

const FormContainer = ({ action, children, onSuccess }: FormContainerProps) => {
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state.message, state.success]);

  useEffect(() => {
    if (state.success) {
      onSuccess?.();
    }
  }, [state.success, onSuccess]);

  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
