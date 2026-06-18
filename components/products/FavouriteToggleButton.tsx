import { auth } from "@clerk/nextjs/server";
import FavouriteToggleForm from "./FavouriteToggleForm";
import { FavouriteSignInBtn } from "../form/Buttons";
import { fetchFavouriteId } from "@/utils/actions";

const FavouriteToggleButton = async ({ productId }: { productId: string }) => {
  const { userId } = auth();

  if (!userId) return <FavouriteSignInBtn />;

  const favouriteId = await fetchFavouriteId({ productId });

  return (
    <FavouriteToggleForm favouriteId={favouriteId} productId={productId} />
  );
};

export default FavouriteToggleButton;
