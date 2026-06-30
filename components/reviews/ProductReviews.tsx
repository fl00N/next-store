import { fetchProductReviews } from "@/utils/actions";
import ReviewCard from "./ReviewCard";
import SectionTitle from "../global/SectionTitle";

const ProductReviews = async ({ productId }: { productId: string }) => {
  const reviews = await fetchProductReviews({ productId });

  return (
    <div className="mt-16">
      <SectionTitle text="Product reviews" />
      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map((review) => {
          const { id, clerkId, comment, rating, authorImageUrl, authorName } =
            review;

          return (
            <ReviewCard
              key={id}
              reviewId={id}
              authorId={clerkId}
              comment={comment}
              rating={rating}
              image={authorImageUrl}
              name={authorName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductReviews;
