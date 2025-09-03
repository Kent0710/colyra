"use client";

import { searchSpacesFormSchema } from "@/types/form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { useSpacesStore } from "@/stores/useSpacesStore";
import { GetSpacesSpaceResponseType } from "@/actions/space";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SearchSpace = () => {
    const [queryResult, setQueryResult] =
        React.useState<GetSpacesSpaceResponseType | null>(null);

    const form = useForm({
        resolver: zodResolver(searchSpacesFormSchema),
        defaultValues: {
            query: "",
        },
        mode: "onChange",
    });

    const handleSearchOnChange = () => {
        setTimeout(() => {
            const query = form.getValues("query");
            // Check if the query which is the space name exists in the spaces store
            const spaces = useSpacesStore.getState().spaces;
            const foundSpace = spaces.find(
                (space) => space.name.toLowerCase() === query.toLowerCase()
            );
            if (foundSpace) {
                setQueryResult(foundSpace);
            } else {
                setQueryResult(null);
            }
        }, 1000);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((data) => {
                    console.log(data);
                })}
            >
                <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                        <FormItem
                            onChange={handleSearchOnChange}
                            className="w-[15rem] sm:w-[15rem] xl:w-[20rem]"
                        >
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Search a space..."
                                        {...field}
                                        className="text-sm font-medium bg-white text-neutral-700"
                                    />
                                    {queryResult && (
                                        <div className="absolute bg-purple-50 border shadow-sm h-fit p-2 rounded-lg  w-full mt-4">
                                            <small className="text-xs font-medium text-muted-foreground">
                                                {" "}
                                                Search results{" "}
                                            </small>
                                            <Link
                                                href={`/spaces/${queryResult.space_id}`}
                                                onNavigate={() => {
                                                    // Set the query result to null
                                                    setQueryResult(null);
                                                    // Reset the form
                                                    form.reset();
                                                }}
                                            >
                                                <Button
                                                    className="w-full justify-between items-center hover:cursor-pointer"
                                                    variant={"ghost"}
                                                >
                                                    {queryResult.name}
                                                    <ArrowRight />
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default SearchSpace;
