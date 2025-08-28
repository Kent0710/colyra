"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getAccount } from "./account";

interface MembersResponse {
    space_id: string;
    isApproved: boolean;
    account_id: {
        id: string | null;
        username: string | null;
    };
}

export async function getSpaceMembersBySpaceId(spaceId: string): Promise<{
    members: MembersResponse[];
    isNotApprovedMembers: MembersResponse[];
    approvedMembers: MembersResponse[];
    error: string | null;
}> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("user_space")
        .select(`*, account_id(username, id)`)
        .eq("space_id", spaceId);

    const isNotApprovedMembers =
        data?.filter((member) => member.isApproved === false) || [];
    const approvedMembers =
        data?.filter((member) => member.isApproved === true) || [];

    if (!error) {
        return {
            members: data || [],
            isNotApprovedMembers: isNotApprovedMembers || [],
            approvedMembers: approvedMembers || [],
            error: null,
        };
    } else {
        return {
            members: [],
            isNotApprovedMembers: isNotApprovedMembers || [],
            approvedMembers: approvedMembers || [],
            error: error.message,
        };
    }
}

export async function approveMember(
    spaceId: string,
    accountId: string
): Promise<{ error: string | null }> {
    const supabase = await createClient();

    const { error } = await supabase
        .from("user_space")
        .update({ isApproved: true })
        .eq("space_id", spaceId)
        .eq("account_id", accountId);

    revalidatePath('/space/[spaceId]');

    if (!error) {
        return { error: null };
    } else {
        return { error: error.message };
    }
}

export async function disproveMember(
    spaceId: string,
    accountId: string
): Promise<{ error: string | null }> {
    const supabase = await createClient();

    // Get the user space item and if the account_id and the isOwner is true, prevent the action
    const { data: userSpaceData, error: userSpaceError } = await supabase
        .from("user_space")
        .select("*")
        .eq("space_id", spaceId)
        .eq("account_id", accountId)
        .single();
        
    if (userSpaceError) {
        return { error: userSpaceError.message };
    }
    if (userSpaceData?.isOwner) {
        return { error: "You cannot disprove the space owner." };
    }

    const { error } = await supabase
        .from("user_space")
        .update({ isApproved: false })
        .eq("space_id", spaceId)
        .eq("account_id", accountId);

    revalidatePath('/space/[spaceId]');

    if (!error) {
        return { error: null };
    } else {
        return { error: error.message };
    }
}