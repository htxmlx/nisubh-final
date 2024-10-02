import Section from "@/components/common/section";
import UnauthorizedPage from "@/components/common/unauthorized";
import CreatePostForm from "@/features/posts/components/create-post";
import { Protect } from "@clerk/nextjs";
import React from "react";

export default function Page() {
    return (
        <Section>
            <Protect
                fallback={<UnauthorizedPage />}
                permission="org:listing:create"
            >
                <CreatePostForm />
            </Protect>
        </Section>
    );
}
