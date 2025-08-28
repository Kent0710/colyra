"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface DisproveMemberButtonProps {
    spaceId: string;
    accountId: string | null;
}

const DisproveMemberButton: React.FC<DisproveMemberButtonProps> = ({
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

        const { disproveMember } = await import("@/actions/member");
        const res = await disproveMember(spaceId, accountId);
        if (!res.error) {
            toast.success("Member successfully disproved.");
            
        } else {
            element?.classList.remove("opacity-10", "pointer-events-none");
            toast.error(res.error);
        }
    };

    return (
        <Button variant={"secondary"} onClick={approveMemberHandler}>
            <X />
        </Button>
    );
};

export default DisproveMemberButton;
