import BottomBar from "@/components/bottom-bar";
import TopBar from "@/components/top-bar";
import React, { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
            <TopBar />
            {children}
            <BottomBar />
        </>
    );
}
