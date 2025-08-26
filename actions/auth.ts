"use server";

import { z } from "zod";
import { authFormSchema } from "@/types/form-schemas";
import { createClient } from "@/lib/supabase/server";

export async function login(values: z.infer<typeof authFormSchema>) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: values.username + "@gmail.com",
        password: values.password,
    });

    if (!error) {
        return { success: true, error: null };
    }

    return {
        success: false,
        error: error.message,
    };
}

export async function createAccount(values: z.infer<typeof authFormSchema>) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email: values.username + "@gmail.com",
        password: values.password,
    });

    if (!error ) {
        // Insert an account record to the account table
        // TODO: Handle potential error here
        await supabase
            .from("account")
            .insert({
                auth_user_id: data.user!.id,
                username: values.username,
            });

        return { success: true, error: null };
    }

    return {
        success: false,
        error: error.message,
    };
}
