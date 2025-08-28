import { Suspense } from "react";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
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
import { Button } from "./ui/button";
import { ArrowRightFromLine, Ellipsis } from "lucide-react";
import DeleteSpace from "./delete-space";
import Link from "next/link";

export const SpacesLoader = () => {
    return (
        <Suspense fallback={<div>Loading spaces...</div>}>
            <Spaces />
        </Suspense>
    );
};

export const Spaces = async () => {
    const { getSpaces } = await import("@/actions/space");
    const { spaces, data } = await getSpaces();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* <pre> {JSON.stringify(data, null, 2)} </pre> */}
            {spaces.map((space) => (
                <Card key={space.id} id={space.id}>
                    <CardHeader>
                        <CardTitle> {space.name} </CardTitle>
                        <CardDescription>Card Description</CardDescription>
                        <CardAction>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"secondary"}>
                                        <Ellipsis />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <DeleteSpace spaceId={space.id} />
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <Link href={`/spaces/${space.id}`}>
                            <Button variant={"outline"}>
                                {" "}
                                <ArrowRightFromLine /> Open space{" "}
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
            <Card id="new-space-card-loader" className="hidden"></Card>
        </div>
    );
};
