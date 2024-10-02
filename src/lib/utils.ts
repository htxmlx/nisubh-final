import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatPrice = (price: number): string => {
    if (price >= 1_000_000) {
        return `${(price / 1_000_000).toFixed(1)}M`;
    }
    if (price >= 1_000) {
        return `${(price / 1_000).toFixed(1)}k`;
    }
    return price.toString();
};
