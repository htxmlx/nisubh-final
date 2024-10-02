"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateRating(
    postId: string,
    rating: number,
    review: string
) {
    const { userId } = auth();

    if (!userId) return;

    try {
        // Update the existing rating
        await prisma.rating.updateMany({
            where: {
                userId,
                postId,
            },
            data: {
                value: rating,
                review,
            },
        });
        revalidatePath(`/details?id=${postId}`);
        redirect(`/details?id=${postId}`);
    } catch (error) {
        console.error("Error updating rating:", error);
    }
}
