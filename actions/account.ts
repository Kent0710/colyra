'use server'

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
import {z} from 'zod'
import { isEditingAccountDetailsFormSchema } from "@/types/form-schemas";

export async function getAccount() {
    const supabase = await createClient();

    // Check if authenticated
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Use the user.id to fetch the account details from the "account" table
    if (user) {
        const { data: account, error } = await supabase
            .from("account")
            .select("*")
            .eq("auth_user_id", user.id)
            .single();

        if (error) {
            console.error("Error fetching account:", error);
            return { account: null, error: error.message };
        }

        return { account, error: null };
    } else {
        redirect('/login')
    }
};

export async function updateAccountDetails(values: z.infer<typeof isEditingAccountDetailsFormSchema>) {
    const supabase = await createClient();

    // Check if authenticated
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        const { error } = await supabase
            .from("account")
            .update({ username: values.username })
            .eq("auth_user_id", user.id);

        if (error) {
            console.error("Error updating account:", error);
            return { success: false, error: error.message };
        }

        return { success: true, error: null };
    } else {
        redirect('/login')
    }
};