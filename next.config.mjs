import {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
} from "next/constants.js";

/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
                port: "",
                pathname: "**",
            },
        ],
    },
};

const nextConfigFunction = async (phase) => {
    if (
        phase === PHASE_DEVELOPMENT_SERVER ||
        phase === PHASE_PRODUCTION_BUILD
    ) {
        const withPWA = (await import("@ducanh2912/next-pwa")).default({
            dest: "public",
            fallbacks: {
                document: "/~offline",
            },
        });
        return withPWA(nextConfig);
    }
    return nextConfig;
};

export default nextConfigFunction;
