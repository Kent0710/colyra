"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface ApproveMemberButtonProps {
    spaceId: string;
    accountId: string | null;
}
const ApproveMemberButton: React.FC<ApproveMemberButtonProps> = ({
    spaceId,
    accountId,
}) => {
    const approveMemberHandler = async () => {
        const element = document.getElementById(accountId!);
        // Add styling
        element?.classList.add("opacity-10", "pointer-events-none");

        if (!accountId) {
            toast.error("Invalid account ID");
            return;
        }

        const { approveMember } = await import("@/actions/member");
        const res = await approveMember(spaceId, accountId);

        if (!res.error) {
            toast.success("Member approved successfully");
        } else {
            element?.classList.remove("opacity-10", "pointer-events-none");
            toast.error(res.error);
        }
    };

    return (
        <Button variant={"secondary"} onClick={approveMemberHandler}>
            <Check />
        </Button>
    );
};

export default ApproveMemberButton;
