import { Button } from "../ui/button";
import { FaHeart } from "react-icons/fa";

const FavouriteToggleButton = ({ productId }: { productId: string }) => {
  const handleClick = () => {
    console.log(productId);
  };

  return (
    <Button size="icon" variant="outline" className="p-2" onClick={handleClick}>
      <FaHeart />
    </Button>
  );
};

export default FavouriteToggleButton;
