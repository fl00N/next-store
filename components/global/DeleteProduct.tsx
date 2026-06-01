"use client";

import { deleteProductAction } from "@/utils/actions";
import { IconButton } from "@/components/form/Buttons";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialState = { message: "" };

const DeleteProduct = ({ productId }: { productId: string }) => {
  const deleteProduct = deleteProductAction.bind(null, { productId });
  const [state, formAction] = useFormState(deleteProduct, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      toast.success(state.message);

      router.refresh();
    }
  }, [state.message, router]);

  return (
    <form action={formAction}>
      <IconButton actionType="delete"></IconButton>
    </form>
  );
};

export default DeleteProduct;
