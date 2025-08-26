"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadResourceLinkFormSchema } from "@/types/form-schemas";
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
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const UploadResourceLinkForm = () => {
    // Get the spaceId from the URL
    const params = useParams();
    const { spaceId } = params;

    const form = useForm({
        resolver: zodResolver(uploadResourceLinkFormSchema),
        defaultValues: {
            link: "",
            name: "",
        },
    });

    const onSubmit = async (
        values: z.infer<typeof uploadResourceLinkFormSchema>
    ) => {
        const newResourceCardLoader = document.getElementById(
            "new-resource-card-loader"
        );
        newResourceCardLoader?.classList.add("animate-pulse");
        newResourceCardLoader?.classList.remove("hidden");

        const { uploadResourceLink } = await import("@/actions/resource");
        const res = await uploadResourceLink(values, spaceId as string);

        newResourceCardLoader?.classList.remove("animate-pulse");
        newResourceCardLoader?.classList.add("hidden");

        if (res.success) {
            form.reset();
            toast.success("Resource link uploaded successfully");
        } else {
            toast.error(res.error || "Failed to upload resource link.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resource Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Resource Name" {...field} />
                            </FormControl>
                            <FormDescription>
                                Provide a name for the resource.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resource Link</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://example.com/resource"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Provide a link to the resource you want to
                                share.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Upload link</Button>
            </form>
        </Form>
    );
};

export default UploadResourceLinkForm;
