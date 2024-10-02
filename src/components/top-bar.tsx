"use client";

import { Menu, Search, User, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function TopBar() {
    const { theme, setTheme } = useTheme();

    return (
        <nav className="fixed top-0 left-0 right-0 bg-background rounded-full m-2 border shadow-md z-10 max-w-md mx-auto">
            <div className="flex items-center p-2 max-w-screen-sm mx-auto gap-2">
                <Link href="/" className="flex-1 flex items-center">
                    <Button variant="ghost" size="icon">
                        <Image
                            src="/icons/logo.svg"
                            alt="logo"
                            width={25}
                            height={25}
                            className="dark:invert"
                        />
                        <span className="sr-only">Logo</span>
                    </Button>
                    <span className="font-semibold">Nisu BH</span>
                </Link>

                <Button
                    onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                    }
                    variant="ghost"
                    size="icon"
                >
                    <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
                <SignedOut>
                    <Link
                        className={buttonVariants({
                            variant: "ghost",
                            size: "icon",
                        })}
                        href="/sign-in"
                    >
                        <User className="size-5" />
                        <span className="sr-only">User profile</span>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
}
