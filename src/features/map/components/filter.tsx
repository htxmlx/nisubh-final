import { formatPrice } from "@/lib/utils";
import { Search, Settings2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

// Define types for the props
interface MapFilterProps {
    priceRange: [number, number];
    setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleStyleChange: any;
    currentMapStyle: string;
}

export default function MapFilter({
    priceRange,
    setPriceRange,
    setIsDrawerOpen,
    handleStyleChange,
    currentMapStyle,
}: MapFilterProps) {
    return (
        <div className="flex gap-2 items-center justify-between px-2 h-6 z-50">
            <div className="relative flex-1">
                <div className="price-filter p-4 shadow-md rounded">
                    <Slider
                        min={0}
                        max={5000}
                        step={1000}
                        value={priceRange}
                        onValueChange={(value) =>
                            setPriceRange(value as [number, number])
                        }
                        className="w-full min-w-[250px] mt-2"
                    />
                    <div className="flex justify-between mt-2 text-sm">
                        <span>{formatPrice(priceRange[0])}</span>
                        <span>{formatPrice(priceRange[1])}</span>
                    </div>
                </div>
            </div>

            <Drawer>
                <DrawerTrigger asChild>
                    <Button size="icon" variant="outline">
                        <Settings2 className="size-6" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="space-y-5 h-[50vh] max-w-md mx-auto flex flex-col items-center">
                    <h3 className="text-center">Map Type</h3>
                    <div className="flex gap-5">
                        <div
                            className="rounded-lg overflow-hidden flex flex-col items-center"
                            onClick={() =>
                                handleStyleChange(
                                    "mapbox://styles/mapbox/streets-v12"
                                )
                            }
                        >
                            <div className="aspect-video relative h-12">
                                <Image
                                    objectFit="cover"
                                    src="/standard.png"
                                    fill
                                    alt="image"
                                />
                            </div>
                            Standard
                        </div>

                        <div
                            className="rounded-lg overflow-hidden flex flex-col items-center"
                            onClick={() =>
                                handleStyleChange(
                                    "mapbox://styles/mapbox/satellite-streets-v12"
                                )
                            }
                        >
                            <div className="aspect-video relative h-12">
                                <Image
                                    objectFit="cover"
                                    src="/satellite.png"
                                    fill
                                    alt="image"
                                />
                            </div>
                            Satellite
                        </div>

                        <div
                            className="rounded-lg overflow-hidden flex flex-col items-center"
                            onClick={() =>
                                handleStyleChange(
                                    "mapbox://styles/mapbox/outdoors-v12"
                                )
                            }
                        >
                            <div className="aspect-video relative h-12">
                                <Image
                                    objectFit="cover"
                                    src="/street.png"
                                    fill
                                    alt="image"
                                />
                            </div>
                            Street
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
