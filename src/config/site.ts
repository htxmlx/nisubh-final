export const siteConfig = {
    name: "Nisubh",
    description: "NISU Boarding House Maping System",
};

export const metadataConfig = {
    applicationName: siteConfig.name,
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black",
        title: siteConfig.name,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: siteConfig.name,
        title: {
            default: siteConfig.name,
            template: `%s - ${siteConfig.name}`,
        },
        description: siteConfig.description,
    },
    twitter: {
        card: "summary",
        title: {
            default: siteConfig.name,
            template: `%s - ${siteConfig.name}`,
        },
        description: siteConfig.description,
    },
};
