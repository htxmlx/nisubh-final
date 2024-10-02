"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Rating } from "@prisma/client";
import { updateRating } from "../api/update-rating";
import { createRating } from "../api/create-rating";
import { SubmitHandler, useForm } from "react-hook-form";

const ratingSchema = z.object({
    rating: z.number().min(1).max(5),
    review: z.string().min(5),
});

type RatingFormValues = z.infer<typeof ratingSchema>;

export default function RatingForm({
    postId,
    existingReview,
}: {
    postId: string;
    existingReview?: Rating;
}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<RatingFormValues>({
        resolver: zodResolver(ratingSchema),
        defaultValues: {
            rating: existingReview ? existingReview.value : 0,
            review: existingReview ? existingReview.review : "",
        },
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<RatingFormValues> = async ({
        rating,
        review,
    }) => {
        try {
            if (existingReview) {
                // Update the existing review
                await updateRating(postId, rating, review);
            } else {
                // Create a new review
                await createRating(postId, rating, review);
            }
            router.push(`/details?id=${postId}`);
        } catch (error) {
            console.error("An unexpected error occurred:", error);
        }
    };

    function InputFieldError({ text = "" }: { text?: string }) {
        return <p className="text-red-500">{text}</p>;
    }

    // Handle star click
    const handleStarClick = (value: number) => {
        setValue("rating", value);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
                <Label htmlFor="rating">Rating</Label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <StarFilledIcon
                            key={star}
                            className={`w-8 h-8 cursor-pointer ${
                                watch("rating") >= star
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                            }`}
                            onClick={() => handleStarClick(star)}
                        />
                    ))}
                </div>
                {errors.rating && (
                    <InputFieldError text={errors.rating.message} />
                )}
            </div>

            <div>
                <Label htmlFor="review">Review</Label>
                <Textarea
                    id="review"
                    {...register("review")}
                    placeholder="Write your review here"
                    rows={4}
                    className="p-2 border rounded"
                />
                {errors.review && (
                    <InputFieldError text={errors.review.message} />
                )}
            </div>

            <Button className="mt-auto" type="submit" disabled={isSubmitting}>
                {isSubmitting
                    ? "Submitting..."
                    : existingReview
                    ? "Update Rating"
                    : "Submit Rating"}
            </Button>
        </form>
    );
}
