"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
    className?: string;
    children: ReactNode;
}
export default function Section({ children, className }: SectionProps) {
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.5 }}
            className={cn(
                className,
                "min-h-screen py-24 px-2 space-y-5 max-w-md mx-auto"
            )}
        >
            {children}
        </motion.div>
    );
}
