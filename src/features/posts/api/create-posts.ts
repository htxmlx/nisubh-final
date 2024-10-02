"use server";
import prisma from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(
    formData: Omit<
        Post,
        "id" | "createdAt" | "updatedAt" | "userId" | "owner_image"
    >
) {
    const { userId } = auth();

    if (!userId) return;

    const clerk = clerkClient();

    const { imageUrl } = await clerk.users.getUser(userId);

    try {
        await prisma.post.create({
            data: { ...formData, userId, owner_image: imageUrl },
        });
        revalidatePath("/profile");
        redirect("/profile");

        console.log("success");
    } catch (error) {
        console.error("Error creating post:", error);
    }
}

export async function deletePost(postId: string) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("User is not authenticated");
    }

    try {
        // Find the post to ensure it exists and get its userId
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            throw new Error("Post not found");
        }

        // Check if the authenticated user is the owner of the post
        if (post.userId !== userId) {
            throw new Error("User is not authorized to delete this post");
        }

        // Proceed to delete the post
        await prisma.post.delete({
            where: { id: postId },
        });
        revalidatePath("/profile");
        console.log("Post deleted successfully");
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
}
