'use client'

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { Trash } from "lucide-react";

interface DeleteSpaceProps {
    spaceId : string;
}

const DeleteSpace : React.FC<DeleteSpaceProps> = ({
    spaceId
}) => {
    const handleDeleteSpace = async (spaceId: string) => {
        const spaceElement = document.getElementById(spaceId);
        spaceElement?.classList.add("opacity-10");

        const { deleteSpace } = await import("@/actions/space");
        const res = await deleteSpace(spaceId);

        if (res.success) {
            toast.success("Space deleted successfully");
        } else {
            toast.error(res.error || "Failed to delete space.");
            spaceElement?.classList.remove("opacity-50");
        }
    };

    return (
        <Button
            variant={"dropdownMenuButton"}
            onClick={() => handleDeleteSpace(spaceId)}
        >
            {" "}
            <Trash /> Delete space{" "}
        </Button>
    );
};

export default DeleteSpace;
