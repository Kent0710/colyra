"use client";

import React from "react";

import { GetSpacesSpaceResponseType } from "@/actions/space";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "./ui/skeleton";

import { ArrowDown, Ellipsis, Filter, Frown } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SectionTitle } from "./reusables/titles";
import { SectionHeaderWrapper } from "./reusables/wrappers";
import { useSpacesStore } from "@/stores/useSpacesStore";
import DeleteSpace from "./delete-space";

interface SpacesProps {
    spaces: GetSpacesSpaceResponseType[];
}

const Spaces: React.FC<SpacesProps> = ({ spaces: initialSpaces }) => {
    const spaces = useSpacesStore((state) => state.spaces);
    const setSpaces = useSpacesStore((state) => state.setSpaces);

    // if store is still empty, initialize it directly
    if (spaces.length === 0 && initialSpaces.length > 0) {
        setSpaces(initialSpaces);
    }

    const [filter, setFilter] = React.useState<string>("all");
    // For pagination
    const [page, setPage] = React.useState<number>(1);
    // For pagination loading state
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const loadMore = async () => {
        setIsLoading(true);

        const { getSpaces } = await import("@/actions/space");

        const { spaces: newSpaces } = await getSpaces({
            limit: 5,
            offset: page * 5,
            filter: filter === "all" ? undefined : (filter as any),
        });
        // Append new spaces to the existing ones
        setSpaces([...spaces, ...newSpaces]);
        setPage((prev) => prev + 1);
        setIsLoading(false);
    };

    const applyFilter = async (newFilter: string) => {
        setIsLoading(true);
        setFilter(newFilter);
        setPage(1);

        const { getSpaces } = await import("@/actions/space");
        const { spaces: newSpaces } = await getSpaces({
            limit: 5,
            offset: 0,
            filter: newFilter === "all" ? undefined : (newFilter as any),
        });

        setSpaces(newSpaces);
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-40" />
                <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} className="h-24 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <SectionHeaderWrapper className="flex justify-between items-center">
                <SectionTitle> Your Spaces </SectionTitle>
                <Select
                    value={filter}
                    onValueChange={applyFilter}
                    defaultValue="all"
                >
                    <SelectTrigger>
                        <>
                            <Filter />
                            <SelectValue placeholder="Filter..." />
                        </>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="owned">Owned</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
            </SectionHeaderWrapper>
            {spaces.map((space, index) => (
                <Card key={space.name + index} className="my-4" id={space.space_id}>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>{space.name}</CardTitle>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">
                                        <Ellipsis />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        Space Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <DeleteSpace spaceId={space.space_id} />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <CardDescription>
                            {space.isOwner
                                ? "You own this space"
                                : space.isApproved
                                ? "You are approved in this space"
                                : "Your request is pending"}
                        </CardDescription>
                    </CardHeader>

                    <CardFooter>
                        <CardAction>
                            <Link href={`/spaces/${space.space_id}`}>
                                <Button>View Space</Button>
                            </Link>
                        </CardAction>
                    </CardFooter>
                </Card>
            ))}

            {spaces.length === 0 ? (
                <Alert className="my-4">
                    <Frown />
                    <AlertTitle>Oops no spaces!</AlertTitle>
                    <AlertDescription>
                        It looks like you do not have any spaces with this
                        filter.
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="flex justify-center my-4">
                    <Button
                        onClick={loadMore}
                        disabled={isLoading}
                        variant={"outline"}
                    >
                        {isLoading ? (
                            "Loading..."
                        ) : (
                            <>
                                <ArrowDown /> Load more...
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Spaces;
