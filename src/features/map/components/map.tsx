"use client";

import { cn, formatPrice } from "@/lib/utils";
import type { Post } from "@prisma/client";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import {
    MapRef,
    Map as MapGL,
    Marker,
    NavigationControl,
    GeolocateControl,
} from "react-map-gl";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MapFilter from "./filter";

import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN =
    "pk.eyJ1IjoiYXprcml2ZW4xNiIsImEiOiJjbGhma3IxaWcxN3c3M2VyM3VhcGsxcHk3In0.pto_0eshW9NHMP-m1O_blg";

const mapStyles = {
    light: "mapbox://styles/mapbox/light-v11",
    dark: "mapbox://styles/mapbox/dark-v11",
    satellite: "mapbox://styles/mapbox/satellite-v9",
};

interface MapProps {
    data: Post[];
}

export default function Map({ data }: MapProps) {
    const { theme } = useTheme();
    const searchParams = useSearchParams();

    const mapRef = useRef<MapRef>(null);
    const mapStyle = searchParams.get("mapStyle");
    const [selectedCity, setSelectedCity] = useState<Post | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [currentMapStyle, setCurrentMapStyle] = useState<string>(
        mapStyle || (theme === "dark" ? mapStyles.dark : mapStyles.light)
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Update currentMapStyle based on the theme
        const newMapStyle = theme === "dark" ? mapStyles.dark : mapStyles.light;
        setCurrentMapStyle(newMapStyle);
    }, [theme]);

    const [pin, setPin] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null); // Manage a single pin
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const filteredData = data.filter((item) => {
        const price = Number(item.price);
        return price >= priceRange[0] && price <= priceRange[1];
    });

    const handleMapClick = (e: any) => {
        const { lng, lat } = e.lngLat;
        setPin({ latitude: lat, longitude: lng }); // Set the new pin
    };

    const handleStyleChange = (val: string) => {
        setCurrentMapStyle(val);
    };

    return (
        <>
            <MapFilter
                priceRange={priceRange}
                setIsDrawerOpen={setIsDrawerOpen}
                setPriceRange={setPriceRange}
                currentMapStyle={currentMapStyle}
                handleStyleChange={handleStyleChange}
            />
            <MapGL
                ref={mapRef}
                initialViewState={{
                    latitude: 11.461424460015792,
                    longitude: 123.14389088712784,
                    zoom: 12,
                    bearing: 0,
                    pitch: 0,
                }}
                mapStyle={currentMapStyle}
                mapboxAccessToken={TOKEN}
                style={{
                    height: "100%",
                    width: "100%",
                    zIndex: 10,
                }}
                onClick={handleMapClick} // Call handleMapClick on click
            >
                {filteredData.map((city, index) => (
                    <Marker
                        key={`marker-${index}`}
                        latitude={city.latitude}
                        longitude={city.longitude}
                        anchor="bottom"
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            setSelectedCity(city);
                        }}
                    >
                        <Badge>{formatPrice(Number(city.price))}</Badge>
                    </Marker>
                ))}

                {pin && ( // Render the pin if it exists
                    <Marker
                        latitude={pin.latitude}
                        longitude={pin.longitude}
                        anchor="bottom"
                    >
                        <Badge className="flex flex-col">
                            <p>{`Lat: ${pin.latitude.toFixed(4)}`}</p>
                            <p>{`Lng: ${pin.longitude.toFixed(4)}`}</p>
                        </Badge>
                    </Marker>
                )}

                <GeolocateControl position="top-left" />
                <NavigationControl position="top-right" />
            </MapGL>

            {selectedCity && (
                <ListingCard
                    item={selectedCity}
                    onClose={() => setSelectedCity(null)}
                />
            )}
        </>
    );
}

export const ListingCard = ({
    item,
    onClose,
}: {
    item: Post;
    onClose: () => void;
}) => (
    <Card className="z-50 fixed bottom-14 w-full max-w-md">
        <CardHeader className="relative border-b w-full h-32">
            <Image
                fill
                src={item.images[0]}
                alt={`Image of ${item.title}`}
                className="w-full h-40 object-cover"
            />
            <Button
                variant="outline"
                size="icon"
                onClick={onClose}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
                &times;
            </Button>
        </CardHeader>
        <CardContent>
            <h2 className="text-xl font-semibold mb-2">{item.address}</h2>
            <p>
                <strong>Price:</strong> {item.price}
            </p>
            <p>
                <strong>Latitude:</strong> {item.latitude}
            </p>
            <p>
                <strong>Longitude:</strong> {item.longitude}
            </p>
        </CardContent>
        <CardFooter>
            <Link
                href={`/details?id=${item.id}`}
                className={cn(buttonVariants())}
            >
                More Info
            </Link>
            <Link
                href={`https://www.google.com/maps/dir/?api=1&destination=${item.latitude},${item.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants(), "ml-2")}
            >
                Navigate
            </Link>
        </CardFooter>
    </Card>
);
