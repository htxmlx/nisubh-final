import type { Post, Rating } from "@prisma/client";
import { z } from "zod";

export type PostWithRating = Post & {
    averageRating: number | null;
    ratings: Rating[];
};

export const CreatePostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    price: z.number().min(0, "Price must be a positive number"),
    address: z.string().min(1, "Address is required"),
    latitude: z
        .number()
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90"),
    longitude: z
        .number()
        .min(-180, "Longitude must be between -180 and 180")
        .max(180, "Longitude must be between -180 and 180"),
    bedroom_no: z
        .number()
        .min(0, "Bedroom number cannot be negative")
        .int("Bedroom number must be an integer"),
    bathroom_no: z
        .number()
        .min(0, "Bathroom number cannot be negative")
        .int("Bathroom number must be an integer"),
    wifi_available: z.boolean(),
    watersupply_available: z.boolean(),
    close_to: z.enum(["west", "main", "both"]),
    owner_name: z.string().min(1, "Owner Name is required"),
    owner_contact: z.string().min(1, "Owner Contact is required"),
    images: z.array(z.string().url("Invalid URL format for image")),
});
