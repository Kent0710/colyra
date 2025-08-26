"use server";

import { createClient } from "@/lib/supabase/server";
import { SpaceTableSchema } from "@/types/db-schemas";
import { createSpaceFormSchema } from "@/types/form-schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function getSpaces(): Promise<{
    spaces: SpaceTableSchema[];
    error: string | null;
}> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data, error } = await supabase
        .from("user_space")
        .select(`*, space(*)`)
        .eq("user_id", user.id);

    if (!error) {
        const spaces = data?.map((entry) => entry.space) || [];

        return {
            spaces: spaces || [],
            error: null,
        };
    }

    return {
        spaces: [],
        error: error.message,
    };
}

export async function getSpaceById(spaceId: string): Promise<{
    space: SpaceTableSchema | null;
    error: string | null;
}> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data, error } = await supabase
        .from("space")
        .select("*")
        .eq("id", spaceId)
        .single();

    if (!error) {
        return {
            space: data || null,
            error: null,
        };
    }

    return {
        space: null,
        error: error.message,
    };
}

export async function createSpace(
    values: z.infer<typeof createSpaceFormSchema>
) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data, error } = await supabase
        .from("space")
        .insert([
            {
                name: values.name,
                user_id: user.id,
                code: values.code,
            },
        ])
        .select()
        .single();

    if (!error) {
        // Database has the table user_space for mapping users to spaces
        // If space is created, we need to add an entry to user_space
        const { error: userSpaceError } = await supabase
            .from("user_space")
            .insert([
                {
                    user_id: user.id,
                    space_id: data.id,
                },
            ]);

        if (userSpaceError) {
            await supabase.from("space").delete().eq("id", data.id);

            console.error("Fatal error on creating a space: ", userSpaceError.message);

            return {
                success : false,
                error : 'Fatal error. Please try again.'
            }
        }

        revalidatePath("/home");

        return {
            success: true,
            error: null,
        };
    }

    return {
        success: false,
        error: error.message,
    };
}

export async function joinSpace(
    code: string
): Promise<{ success: boolean; error: string | null }> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Check if the space with the given code exists
    const { data: space, error: fetchSpaceError } = await supabase
        .from("space")
        .select("*")
        .eq("code", code)
        .single();

    if (fetchSpaceError) {
        return {
            success: false,
            error: "Space with the provided code does not exist.",
        };
    }

    // Check if the user is already a member of the space
    const { data: existingEntry, error: existingEntryError } = await supabase
        .from("user_space")
        .select("*")
        .eq("user_id", user.id)
        .eq("space_id", space.id)
        .single();

    if (existingEntry && !existingEntryError) {
        return {
            success: false,
            error: "You are already a member of this space.",
        };
    }

    // Add an entry to user_space to map the user to the space
    const { error: userSpaceError } = await supabase.from("user_space").insert([
        {
            user_id: user.id,
            space_id: space.id,
        },
    ]);

    if (userSpaceError) {
        return {
            success: false,
            error: userSpaceError.message,
        };
    }

    revalidatePath("/home");

    return {
        success: true,
        error: null,
    };
}

export async function deleteSpace(
    spaceId: string
): Promise<{ success: boolean; error: string | null }> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { error } = await supabase
        .from("space")
        .delete()
        .eq("id", spaceId)
        .eq("user_id", user.id);

    if (!error) {
        revalidatePath("/home");

        return {
            success: true,
            error: null,
        };
    }

    return {
        success: false,
        error: error.message,
    };
}
