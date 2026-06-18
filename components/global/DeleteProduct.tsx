"use client";

import { deleteProductAction } from "@/utils/actions";
import { IconButton } from "@/components/form/Buttons";
import { useRouter } from "next/navigation";
import FormContainer from "../form/FormContainer";

const DeleteProduct = ({ productId }: { productId: string }) => {
  const deleteProduct = deleteProductAction.bind(null, { productId });
  const router = useRouter();

  return (
    <FormContainer action={deleteProduct} onSuccess={() => router.refresh()}>
      <IconButton actionType="delete"></IconButton>
    </FormContainer>
  );
};

export default DeleteProduct;
