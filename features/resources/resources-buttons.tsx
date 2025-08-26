"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface DeleteResourceButtonProps {
    resourceId: string;
}

export const DeleteResourceButton: React.FC<DeleteResourceButtonProps> = ({
    resourceId,
}) => {
    const handleDeleteResourceClick = async () => {
        const resourceCard = document.getElementById(resourceId);
        resourceCard?.classList.add("opacity-10");

        const { deleteResourceById } = await import("@/actions/resource");
        const res = await deleteResourceById(resourceId);

        if (res.success) {
            toast.success("Resource deleted successfully");
        } else {
            toast.error(res.error || "Failed to delete resource");
        }
    };

    return (
        <Button onClick={handleDeleteResourceClick} variant={"destructive"} asChild>
            <DialogClose>
                <Trash /> Delete resource
            </DialogClose>
        </Button>
    );
};
