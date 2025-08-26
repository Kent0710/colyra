"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authFormSchema } from "@/types/form-schemas";
import React from "react";
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
import Link from "next/link";
import { Loader2 } from "lucide-react";

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            {children}
        </div>
    );
};

interface AuthFormProps {
    onSubmit: (values: z.infer<typeof authFormSchema>) => void;
    headerText: string;
    linkMessage: string;
    linkText: string;
    href: string;
    buttonText: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
    onSubmit,
    headerText,
    linkMessage,
    linkText,
    href,
    buttonText,
}) => {
    const form = useForm({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 border rounded-lg shadow-md p-8 w-[30%]"
            >
                <p className="text-2xl font-medium"> {headerText} </p>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your username"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your unique username.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Make sure your password is strong.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{buttonText}</Button>
                <section>
                    <small>
                        {linkMessage}{" "}
                        <Link
                            href={href}
                            className="hover:text-blue-600 underline"
                        >
                            {" "}
                            {linkText}{" "}
                        </Link>
                    </small>
                </section>
            </form>
        </Form>
    );
};

export default AuthForm;
