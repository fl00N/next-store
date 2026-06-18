"use client";

import FormContainer from "../form/FormContainer";
import { toggleFavoriteAction } from "@/utils/actions";
import { FavouriteSubmitBtn } from "../form/Buttons";
import { useRouter } from "next/navigation";

type FavouriteToggleFormProps = {
  productId: string;
  favouriteId: string | null;
};

const FavouriteToggleForm = ({
  favouriteId,
  productId,
}: FavouriteToggleFormProps) => {
  const toggleAction = toggleFavoriteAction.bind(null, {
    favouriteId,
    productId,
  });
  const router = useRouter();

  return (
    <FormContainer action={toggleAction} onSuccess={() => router.refresh()}>
      <FavouriteSubmitBtn isFavourite={favouriteId ? true : false} />
    </FormContainer>
  );
};

export default FavouriteToggleForm;
