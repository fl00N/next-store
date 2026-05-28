import { FaStar } from "react-icons/fa";

async function ProductRating({ productId }: { productId: string }) {
  const rating = 4.2;
  const count = 25;

  const className = `flex gap-1 items-center text-md mt-1 mb-4`;
  const countValue = `(${count}) reviews`;

  const handleClick = () => {
    console.log(productId);
  };

  return (
    <span className={className} onClick={handleClick}>
      <FaStar className="w-3 h-3" />
      {rating} {countValue}
    </span>
  );
}

export default ProductRating;
