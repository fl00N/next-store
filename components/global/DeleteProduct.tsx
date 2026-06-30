import { deleteProductAction } from "@/utils/actions";
import { IconButton } from "@/components/form/Buttons";
import FormContainer from "../form/FormContainer";

const DeleteProduct = ({ productId }: { productId: string }) => {
  const deleteProduct = deleteProductAction.bind(null, { productId });

  return (
    <FormContainer action={deleteProduct} refreshOnSuccess>
      <IconButton actionType="delete"></IconButton>
    </FormContainer>
  );
};

export default DeleteProduct;
