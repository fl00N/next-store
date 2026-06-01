"use client";

import { actionFunction } from "@/utils/types";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const initialState = { message: "" };

const FormContainer = ({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) => {
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast(state.message);
    }
  }, [state]);
  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
