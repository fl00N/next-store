import { deleteReviewAction } from "@/utils/actions";
import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <FormContainer action={deleteReview} refreshOnSuccess>
      <IconButton actionType="delete"></IconButton>
    </FormContainer>
  );
};

export default DeleteReview;
