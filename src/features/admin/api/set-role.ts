"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Roles } from "../../../../global";

export async function setRole(formData: FormData): Promise<void> {
    // Check that the user trying to set the role is an admin
    if (!checkRole("admin")) {
        throw new Error("Not Authorized");
    }

    try {
        await clerkClient().users.updateUser(formData.get("id") as string, {
            publicMetadata: { role: formData.get("role") },
        });
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        throw new Error("Error updating user role");
    }
}
export const checkRole = (role: Roles) => {
    const { sessionClaims } = auth();

    return sessionClaims?.metadata.role === role;
};
