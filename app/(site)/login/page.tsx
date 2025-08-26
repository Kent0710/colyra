"use client";

import AuthForm, { AuthWrapper } from "@/components/auth-form";

import { z } from "zod";
import { authFormSchema } from "@/types/form-schemas";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const LoginPage = () => {
    const onSubmit = async (values: z.infer<typeof authFormSchema>) => {
        const { login } = await import("@/actions/auth");

        const res = await login(values);

        if (res.success) {
            redirect('/home');
        } else {
            toast.error(res.error || "Something went wrong.");
        }
    };

    return (
        <AuthWrapper>
            <AuthForm
                onSubmit={onSubmit}
                buttonText="Log in"
                headerText="Welcome back"
                linkMessage="Do not have an account?"
                linkText="Create account"
                href="/createAccount"
            />
        </AuthWrapper>
    );
};

export default LoginPage;
