"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { feedbackFormSchema } from "@/types/form-schemas";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FeedbackForm = () => {
    const form = useForm({
        resolver: zodResolver(feedbackFormSchema),
        defaultValues: {
            feedback: "",
            feature: "",
            sendEmail: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof feedbackFormSchema>) => {
        console.log(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="feature"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder="Feature (optional)"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Which feature or part of the app is this
                                feedback about?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl> 
                                <Textarea
                                    placeholder="Your feedback..."
                                    className="resize-none min-h-[10rem] max-h-[15rem]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Please provide your feedback (max 500
                                characters).
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sendEmail"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <p className="font-medium">
                                    Send me an email response
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    If you want to be notified about updates
                                    regarding your feedback.
                                </p>
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                        ? "Submitting..."
                        : "Submit Feedback"}
                </Button>
            </form>
        </Form>
    );
};

export default FeedbackForm;
