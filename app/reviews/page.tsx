import SectionTitle from "@/components/global/SectionTitle";
import ReviewCard from "@/components/reviews/ReviewCard";
import { fetchProductReviewsByUser } from "@/utils/actions";

const ReviewsPage = async () => {
  const reviews = await fetchProductReviewsByUser();

  if (reviews.length === 0)
    return <SectionTitle text="You have no reviews yet" />;

  return (
    <>
      <SectionTitle text="Your reviews" />
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { id, clerkId, comment, rating } = review;
          const { image, name } = review.product;

          return (
            <ReviewCard
              key={id}
              reviewId={id}
              authorId={clerkId}
              comment={comment}
              rating={rating}
              image={image}
              name={name}
            />
          );
        })}
      </div>
    </>
  );
};

export default ReviewsPage;
