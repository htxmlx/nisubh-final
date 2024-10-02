"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UploadButton } from '@/lib/uploadthing'


import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useEffect, type ChangeEvent, type FormEvent } from "react";

import { CreatePostSchema } from "../types";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { createPost } from "../api/create-posts";

export default function CreatePostForm() {
    const form = useForm<z.infer<typeof CreatePostSchema>>({
        resolver: zodResolver(CreatePostSchema),
        defaultValues: {
            close_to: "main",
            watersupply_available: false,
            wifi_available: false,
        },
    });

    useEffect(() => {
        form.reset();
    }, []);

    async function onSubmit(data: z.infer<typeof CreatePostSchema>) {
        try {
            await createPost(data);
            toast("Property Added Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Uh oh! Something went wrong.");
        }

        form.reset();
    }

    function handleLocationClick(e: FormEvent) {
        e.preventDefault();
        console.log(form.formState.errors);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    form.setValue("latitude", latitude);
                    form.setValue("longitude", longitude);
                    console.log(position.coords);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <section className="space-y-5">
                    <h2 className="text-2xl font-bold">Property Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is used for search filtering later.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rent</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>
                                            ) =>
                                                field.onChange(
                                                    parseInt(event.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Monthly cost of rent.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bedroom_no"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bedrooms</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>
                                            ) =>
                                                field.onChange(
                                                    parseInt(event.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        How many bedrooms?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bathroom_no"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bathrooms</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>
                                            ) =>
                                                field.onChange(
                                                    parseInt(event.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        How many bathrooms?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </section>

                <section className="space-y-5">
                    <h2 className="text-2xl font-bold">Property Address</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide the full address and
                                        street name of your property.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="close_to"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nearest Campus</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue="both"
                                                    placeholder="Select Campus"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="main">
                                                Main Campus
                                            </SelectItem>
                                            <SelectItem value="west">
                                                West Campus
                                            </SelectItem>
                                            <SelectItem value="both">
                                                Both Campuses
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Which campus is closest to your
                                        property?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormDescription className="col-span-2">
                            Please provide your precise property location.
                        </FormDescription>

                        <FormField
                            control={form.control}
                            name="latitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Latitude</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="latitude"
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>
                                            ) =>
                                                field.onChange(
                                                    parseFloat(
                                                        event.target.value
                                                    )
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="longitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Longitude</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="longitude"
                                            onChange={(
                                                event: ChangeEvent<HTMLInputElement>
                                            ) =>
                                                field.onChange(
                                                    parseFloat(
                                                        event.target.value
                                                    )
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormDescription className="text-center">
                        Alternatively, you can use your device to determine the
                        property location.
                    </FormDescription>

                    <Button onClick={handleLocationClick} className="w-full">
                        Use Device Location
                    </Button>
                </section>

                <section className="space-y-5">
                    <h2 className="text-2xl font-bold">
                        What do your property offer?
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="wifi_available"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Wifi available</FormLabel>
                                        <FormDescription>
                                            Does your property offer wifi or
                                            internet?
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="watersupply_available"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>Water Supply</FormLabel>
                                        <FormDescription>
                                            Does your property have a water
                                            source.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                </section>

                <section className="space-y-5">
                    <h2 className="text-2xl font-bold">Owner Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="owner_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide your fullname.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="owner_contact"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact No.</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please provide your phone number.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </section>

                <section className="space-y-5">
                    <h2 className="text-2xl font-bold">Upload Images</h2>
                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload up to 4 images</FormLabel>
                                <FormControl>
                                    <UploadButton
                                        appearance={{
                                            button: {
                                                width: "100%",
                                            },
                                        }}
                                        endpoint="imageUploader"
                                        onClientUploadComplete={(res) => {
                                            console.log(res);
                                            form.setValue(
                                                "images",
                                                res.map((item) => item?.url)
                                            );
                                        }}
                                        onUploadError={(error: Error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                <Button className="w-full" type="submit">
                    Submit
                </Button>
            </form>
        </Form>
    );
}
