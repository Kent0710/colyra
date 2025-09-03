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

import {
    ArrowDown,
    ArrowRight,
    Ellipsis,
    File,
    Filter,
    Frown,
    Link2,
    MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SectionTitle } from "./reusables/titles";
import { SectionHeaderWrapper } from "./reusables/wrappers";
import { useSpacesStore } from "@/stores/useSpacesStore";
import DeleteSpace from "./delete-space";
import { Badge } from "./ui/badge";

interface SpacesProps {
    spaces: GetSpacesSpaceResponseType[];
}

const Spaces: React.FC<SpacesProps> = ({ spaces: initialSpaces }) => {
    const spaces = useSpacesStore((state) => state.spaces);
    const setSpaces = useSpacesStore((state) => state.setSpaces);

    React.useEffect(() => {
        if (spaces.length === 0 && initialSpaces.length > 0) {
            setSpaces(initialSpaces);
        }
    }, [spaces.length, initialSpaces, setSpaces]);

    const [filter, setFilter] = React.useState<string>("all");
    // For pagination loading state
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const loadMore = async () => {
        setIsLoading(true);

        const { getSpaces } = await import("@/actions/space");

        const { spaces: newSpaces } = await getSpaces({
            limit: 5,
            offset: spaces.length, // Use current spaces length as offset
            filter: filter as
                | "owned"
                | "approved"
                | "pending"
                | "rejected"
                | "all",
        });

        if (newSpaces.length > 0) {
            // Append new spaces to the existing ones
            setSpaces([...spaces, ...newSpaces]);
        }
        setIsLoading(false);
    };

    const applyFilter = async (newFilter: string) => {
        setIsLoading(true);
        setFilter(newFilter);

        const { getSpaces } = await import("@/actions/space");
        const { spaces: newSpaces } = await getSpaces({
            limit: 5,
            offset: 0,
            filter: newFilter as
                | "owned"
                | "approved"
                | "pending"
                | "rejected"
                | "all",
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
            <section className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {spaces?.map((space, index) => (
                    <Card key={space.name + index} id={space.space_id}>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <section className="space-y-2">
                                    <Badge> Owned </Badge>
                                    <CardTitle className="text-primary">
                                        {space.name}
                                    </CardTitle>
                                </section>
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
                                            <DeleteSpace
                                                spaceId={space.space_id}
                                            />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <CardDescription className="flex gap-4">
                                <section className="flex items-center gap-2">
                                    <Link2 size={17} />
                                    <span>0 links</span>
                                </section>
                                <section className="flex items-center gap-2">
                                    <File size={17} /> <span>0 files</span>
                                </section>
                                <section className="flex items-center gap-2">
                                    <MessageCircle size={17} />{" "}
                                    <span> Chat active </span>
                                </section>
                            </CardDescription>
                        </CardHeader>

                        <CardFooter className="border-t border-pink-300 pt-4 hover:opacity-70 transition-opacity">
                            <CardAction className="w-full">
                                <Link
                                    href={`/spaces/${space.space_id}`}
                                    className="flex items-center justify-between gap-2 w-full text-sm text-muted-foreground"
                                >
                                    <span>Tap to open this space</span>
                                    <ArrowRight  size={17} />
                                </Link>
                            </CardAction>
                        </CardFooter>
                    </Card>
                ))}
            </section>

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
