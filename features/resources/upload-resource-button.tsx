import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UploadResourceLinkForm from "./upload-resource-link-form";
import UploadedMaterials from "./upload-resource-material";
import React from "react";

interface UploadResourceButtonProps {
    spaceId: string;
}
const UploadResourceButton : React.FC<UploadResourceButtonProps> = ({
    spaceId
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    {" "}
                    <Upload /> Upload resource{" "}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload a resource to share</DialogTitle>
                    <DialogDescription>
                        Select between uploading a file or linking to an
                        external resource.
                    </DialogDescription>
                </DialogHeader>
                <main className="w-full">
                    <Tabs defaultValue="link" className="w-full">
                        <TabsList>
                            <TabsTrigger value="link">Link</TabsTrigger>
                            <TabsTrigger value="file">File</TabsTrigger>
                        </TabsList>
                        <TabsContent value="link">
                            <UploadResourceLinkForm />
                        </TabsContent>
                        <TabsContent value="file">
                            <UploadedMaterials spaceId={spaceId} />
                        </TabsContent>
                    </Tabs>
                </main>
            </DialogContent>
        </Dialog>
    );
};

export default UploadResourceButton;
