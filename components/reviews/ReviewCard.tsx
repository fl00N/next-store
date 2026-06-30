"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Rating from "./Rating";
import Comment from "./Comment";
import Image from "next/image";
import DeleteReview from "./DeleteReview";
import { useUser } from "@clerk/nextjs";

type ReviewCardProps = {
  reviewId: string;
  authorId: string;
  comment: string;
  rating: number;
  image: string;
  name: string;
};

const ReviewCard = ({
  reviewId,
  authorId,
  comment,
  rating,
  image,
  name,
}: ReviewCardProps) => {
  const { user } = useUser();

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center">
          <Image
            src={image}
            alt={name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h3 className="text-sm font-bold capitalize mb-1">{name}</h3>
            <Rating rating={rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={comment} />
      </CardContent>

      {user?.id === authorId && (
        <div className="absolute top-3 right-3">
          <DeleteReview reviewId={reviewId} />
        </div>
      )}
    </Card>
  );
};

export default ReviewCard;
