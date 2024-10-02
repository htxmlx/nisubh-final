import Section from "@/components/common/section";
import RatingForm from "@/features/ratings/components/rating-form";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export default async function ReviewPage({
    searchParams,
}: {
    searchParams?: { id: string; action?: string };
}) {
    const listing = await prisma.post.findUnique({
        where: {
            id: searchParams?.id,
        },
    });

    const { userId } = auth();

    if (!userId) redirect("/sign-in");

    if (!listing) return notFound();

    const action = searchParams?.action;

    if (action === "delete") {
        try {
            await prisma.rating.deleteMany({
                where: {
                    userId: userId,
                    postId: listing.id,
                },
            });
            revalidatePath(`/details?id=${listing.id}`);
        } catch (error) {
            console.log(error);
        } finally {
            redirect(`/review?action=deleted`);
        }
    }

    const userReview = await prisma.rating.findUnique({
        where: {
            userId_postId: {
                userId: userId,
                postId: listing.id,
            },
        },
    });

    return (
        <Section>
            {action === "edit" ? (
                <RatingForm
                    postId={listing.id}
                    existingReview={userReview || undefined}
                />
            ) : (
                <RatingForm postId={listing.id} />
            )}
        </Section>
    );
}
