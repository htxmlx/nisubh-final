import Section from "@/components/common/section";
import Map from "@/features/map/components/map";
import prisma from "@/lib/prisma";

export default async function Page() {
    const listings = await prisma.post.findMany();

    return (
        <Section className="space-y-0 py-0 h-screen">
            <Map data={listings} />
        </Section>
    );
}
