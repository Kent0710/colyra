"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createSpaceFormSchema } from "@/types/form-schemas";
import { joinSpaceFormSchema } from "@/types/form-schemas";

import { GroupButtonsWrapper } from "./reusables/wrappers";
import { Button } from "./ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useSpacesStore } from "@/stores/useSpacesStore";

const SpaceActionsButtons = () => {
    const createSpaceForm = useForm({
        resolver: zodResolver(createSpaceFormSchema),
        defaultValues: {
            name: "",
            code: "",
        },
    });

    const handleCreateSpaceSubmit = async (
        values: z.infer<typeof createSpaceFormSchema>
    ) => {
        const newSpaceCardLoader = document.getElementById(
            "new-space-card-loader"
        );
        // Add a pulse loading effect to the new space card
        newSpaceCardLoader?.classList.remove("hidden");
        newSpaceCardLoader?.classList.add("animate-pulse");

        const { createSpace } = await import("@/actions/space");

        const res = await createSpace(values);

        newSpaceCardLoader?.classList.remove("animate-pulse");
        newSpaceCardLoader?.classList.add("hidden");

        if (res.success && res.space) {
            // Update the spaces store
            useSpacesStore.getState().addSpace(res.space);

            createSpaceForm.reset();
            toast.success("Space created successfully!");
        } else {
            toast.error(res.error || "Something went wrong.");
        }
    };

    const joinSpaceForm = useForm({
        resolver: zodResolver(joinSpaceFormSchema),
        defaultValues: {
            code: "",
        },
    });

    const handleJoinSpaceSubmit = async (
        values: z.infer<typeof joinSpaceFormSchema>
    ) => {
        const { joinSpace } = await import("@/actions/space");

        const res = await joinSpace(values.code);

        if (res.success) {
            joinSpaceForm.reset();
            toast.success("Success. Please wait for owner approval.");
        } else {
            toast.error(res.error || "Something went wrong.");
        }
    };

    return (
        <GroupButtonsWrapper>
            <div className="space-x-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button> Create space </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a new space?</DialogTitle>
                            <DialogDescription>
                                Please provide a name for your new space.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...createSpaceForm}>
                            <form
                                onSubmit={createSpaceForm.handleSubmit(
                                    handleCreateSpaceSubmit
                                )}
                                className="space-y-4"
                            >
                                <FormField
                                    control={createSpaceForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Space Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="My new space"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={createSpaceForm.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Space Code</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        placeholder="ABC123"
                                                        {...field}
                                                    />
                                                    <Button
                                                        onClick={() => {
                                                            // Generating a random 6 character alphanumeric code
                                                            // The error for space name should not show when generating the code
                                                            createSpaceForm.setValue(
                                                                "code",
                                                                Math.random()
                                                                    .toString(
                                                                        36
                                                                    )
                                                                    .substring(
                                                                        2,
                                                                        8
                                                                    )
                                                                    .toUpperCase()
                                                            );
                                                        }}
                                                        type="button"
                                                    >
                                                        Generate
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit">Create Space</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"secondary"}>Join Space</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Join an existing space</DialogTitle>
                            <DialogDescription>
                                Provide the code given to you by the space
                                administrator.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...joinSpaceForm}>
                            <form
                                onSubmit={joinSpaceForm.handleSubmit(
                                    handleJoinSpaceSubmit
                                )}
                                className="space-y-4"
                            >
                                <FormField
                                    control={joinSpaceForm.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Space Code</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="ABC123"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit">Join Space</Button>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* <Button variant={"special"}> Premium space </Button> */}
        </GroupButtonsWrapper>
    );
};

export default SpaceActionsButtons;
