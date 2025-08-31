'use client'

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash } from "lucide-react";

import { useSpacesStore } from "@/stores/useSpacesStore";

interface DeleteSpaceProps {
    spaceId : string;
}

const DeleteSpace : React.FC<DeleteSpaceProps> = ({
    spaceId
}) => {
    const deleteSpace = useSpacesStore((state) => state.deleteSpace);

    const handleDeleteSpace = async (spaceId: string) => {
        const spaceElement = document.getElementById(spaceId);
        spaceElement?.classList.add("opacity-10");

        const { deleteSpace : deleteSpaceAction } = await import("@/actions/space");
        const res = await deleteSpaceAction(spaceId);

        if (res.success) {
            // If success, modify the store to remove the space
            // Use the deleteSpace function from the store
            deleteSpace(spaceId);

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
