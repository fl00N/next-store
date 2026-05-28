"use client";

import { Button } from "../ui/button";

function AddToCart({ productId }: { productId: string }) {
  const handleClick = () => {
    console.log(productId);
  };

  return (
    <Button className="capitalize mt-8" size="lg" onClick={handleClick}>
      add to cart
    </Button>
  );
}
export default AddToCart;
