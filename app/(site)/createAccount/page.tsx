"use client";

import AuthForm, { AuthWrapper } from "@/components/auth-form";

import { z } from "zod";
import { authFormSchema } from "@/types/form-schemas";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const CreateAccountPage = () => {
    const onSubmit = async (values: z.infer<typeof authFormSchema>) => {
        const { createAccount } = await import("@/actions/auth");

        const res = await createAccount(values);

        if (res.success) {
            redirect('/home')
        } else {
            toast.error(res.error || "Something went wrong.");
        }
    };

    return (
        <AuthWrapper>
            <AuthForm
                onSubmit={onSubmit}
                buttonText="Create account"
                headerText="Get started"
                linkMessage="Already have an account?"
                linkText="Log in"
                href="/login"
            />
        </AuthWrapper>
    );
};

export default CreateAccountPage;
