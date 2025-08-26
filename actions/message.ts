"use server";

import { z } from "zod";
import { sendMesageFormSchema } from "@/types/form-schemas";
import { createClient } from "@/lib/supabase/server";
import { getAccount } from "./account";

export interface FormattedMessages {
    id : string;
    content : string;
    username : string;
    isOwned : boolean;
}
export async function getMessagesBySpaceId(spaceId: string): Promise<{
    messages: FormattedMessages[];
    error: string | null;
}> {
    const supabase = await createClient();

    const { account } = await getAccount();

    const { data, error } = await supabase
        .from("message")
        .select(
            `id, content, account_id("*"), space_id`
        )
        .eq("space_id", spaceId)

    if (!error) {
        const formattedMesages = data?.map((message) => ({
            id : message.id,
            content : message.content,
            username : message.account_id.username,
            isOwned : message.account_id.id === account.id,
        }))

        return {
            messages: formattedMesages || [],
            error: null,
        };
    } else {
        return {
            messages: [],
            error: error.message,
        };
    }
}

export async function sendMessage(
    values: z.infer<typeof sendMesageFormSchema>,
    spaceId: string
) {
    const supabase = await createClient();

    const { account, error } = await getAccount();

    if (error || !account) {
        // TODO: Redirect to the account creation page not on the login
        return {
            success : false,
            error : "You do not have an account. Please create one."
        }
    }

    const { data, error : insertError } = await supabase.from("message").insert([
        {
            content: values.message,
            space_id: spaceId,
            account_id: account.id,
        },
    ]).select().single();

    if (!insertError) {
        const message = {
            id : data.id,
            content : data.content,
            username : account.username,
            isOwned : true,
        }

        return { success: true, error: null, message : message };
    } else {
        return { success: false, error: insertError.message };
    }
}
