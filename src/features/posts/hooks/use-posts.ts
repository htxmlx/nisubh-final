import { useQuery } from "@tanstack/react-query";
import { CloseTo } from "@prisma/client";
import { getPosts } from "../api/get-posts";

const usePosts = (limit: number, filter?: CloseTo | undefined) => {
    return useQuery({
        queryKey: [`posts-${CloseTo}`, limit],
        queryFn: () => getPosts(limit, filter),
    });
};

export { usePosts, getPosts };
