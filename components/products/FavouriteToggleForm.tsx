"use client";

import FormContainer from "../form/FormContainer";
import { toggleFavoriteAction } from "@/utils/actions";
import { FavouriteSubmitBtn } from "../form/Buttons";
import { usePathname } from "next/navigation";

type FavouriteToggleFormProps = {
  productId: string;
  favouriteId: string | null;
};

const FavouriteToggleForm = ({
  favouriteId,
  productId,
}: FavouriteToggleFormProps) => {
  const pathname = usePathname();

  const toggleAction = toggleFavoriteAction.bind(null, {
    favouriteId,
    productId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction}>
      <FavouriteSubmitBtn isFavourite={favouriteId ? true : false} />
    </FormContainer>
  );
};

export default FavouriteToggleForm;
