"use server";

import { z } from "zod";
import { uploadResourceLinkFormSchema } from "@/types/form-schemas";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { ResourceTableSchema } from "@/types/db-schemas";
import { redirect } from "next/navigation";

export async function getResourcesBySpaceId(
    spaceId: string
): Promise<{ resources: ResourceTableSchema[]; error: string | null }> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("resource")
        .select("*")
        .eq("space_id", spaceId);

    if (!error) {
        return {
            resources: data,
            error: null,
        };
    } else {
        return {
            resources: [],
            error: error.message,
        };
    }
}

export async function uploadResourceLink(
    values: z.infer<typeof uploadResourceLinkFormSchema>,
    spaceId: string
): Promise<{ success: boolean; error: string | null }> {
    const supabase = await createClient();

    // Get user
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    const { error } = await supabase.from("resource").insert([
        {
            link: values.link,
            space_id: spaceId,
            name: values.name,
            user_id : user.id,
            type : 'link',  
        },
    ]);

    if (!error) {
        revalidatePath("/spaces/[spaceId]");

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

export async function deleteResourceById(
    resourceId: string,
): Promise<{ success: boolean; error: string | null }> {
    const supabase = await createClient();

    const { error } = await supabase
        .from("resource")
        .delete()
        .eq("id", resourceId)

    if (!error) {
        revalidatePath("/spaces/[spaceId]");

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

export async function uploadResourceFile(
    file: File,
    spaceId: string
): Promise<{ success: boolean; error: string | null }> {
    const supabase = await createClient();

    // Get user
    const {
        data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    try {
        // Create a simpler filename structure to avoid deep nesting
        const timestamp = Date.now();
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const fileName = `${timestamp}_${sanitizedFileName}`;
        
        // Upload file to Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('resource') // Using the correct bucket name
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return {
                success: false,
                error: `File upload failed: ${uploadError.message}`
            };
        }

        // Get the public URL for the uploaded file
        const { data: { publicUrl } } = supabase.storage
            .from('resource') // Fixed bucket name
            .getPublicUrl(fileName);

        const { error: dbError } = await supabase.from("resource").insert([
            {
                name: file.name,
                space_id: spaceId,
                user_id: user.id,
                type: 'file',
                link: publicUrl 
            },
        ]);

        if (dbError) {
            // If database insert fails, clean up the uploaded file
            await supabase.storage
                .from('resource') // Fixed bucket name to match upload
                .remove([fileName]);
            
            console.error('Database error:', dbError);
            return {
                success: false,
                error: `Database error: ${dbError.message}`
            };
        }

        revalidatePath("/spaces/[spaceId]");

        return {
            success: true,
            error: null,
        };

    } catch (error) {
        console.error('Unexpected error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
}