"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyResourceLinkButtonProps {
    link: string;
}

const CopyResourceLinkButton: React.FC<CopyResourceLinkButtonProps> = ({
    link,
}) => {
    const handleCopyClick = () => {
        navigator.clipboard.writeText(link);
        toast.success("Link copied to clipboard!");
    };

    return (
        <Button onClick={handleCopyClick}>
            <Copy /> Copy Link
        </Button>
    );
};

export default CopyResourceLinkButton;
