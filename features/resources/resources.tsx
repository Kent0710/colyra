import {
    SectionDescription,
    SectionTitle,
} from "@/components/reusables/titles";
import {
    GroupButtonsWrapper,
    ModalWrapper,
    SectionHeaderWrapper,
} from "@/components/reusables/wrappers";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import UploadResourceButton from "./upload-resource-button";
import { getResourcesBySpaceId } from "@/actions/resource";
import { Label } from "@/components/ui/label";
import CopyResourceLinkButton from "./copy-resource-link-button";
import { DeleteResourceButton } from "./resources-buttons";

interface ResourcesProps {
    className?: string;
    spaceId: string;
}

const Resources: React.FC<ResourcesProps> = async ({ className, spaceId }) => {
    const { resources } = await getResourcesBySpaceId(spaceId);

    return (
        <ModalWrapper className={`${className}`}>
            <SectionHeaderWrapper>
                <SectionTitle> Shared Resources </SectionTitle>
                <SectionDescription>
                    {" "}
                    All resources uploaded for this space.{" "}
                </SectionDescription>
            </SectionHeaderWrapper>
            <GroupButtonsWrapper>
                <UploadResourceButton spaceId={spaceId} />
            </GroupButtonsWrapper>
            {/* Resource list will go here */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:overflow-y-auto lg:max-h-[52vh] pr-4">
                {resources.map((resource) => (
                    <Dialog key={resource.id}>
                        <DialogTrigger>
                            <Card id={resource.id}>
                                <CardHeader>
                                    <CardTitle className="text-left line-clamp-2">
                                        {resource.name}{" "}
                                    </CardTitle>
                                    <CardDescription className="text-left truncate">
                                        {resource.user_id}{" "}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="truncate text-left">
                                        {" "}
                                        {resource.link}{" "}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <small className="truncate text-muted-foreground ">
                                        {" "}
                                        {new Date(
                                            resource.uploaded_on
                                        ).toLocaleString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </small>
                                </CardFooter>
                            </Card>
                        </DialogTrigger>
                        <DialogContent className="w-[35rem]">
                            <DialogHeader>
                                <DialogTitle>{resource.name}</DialogTitle>
                                <DialogDescription>
                                    {resource.user_id}
                                </DialogDescription>
                            </DialogHeader>
                            <main className="w-full">
                                <Label htmlFor="link"> Resource link </Label>
                                <p className="text-blue-600 my-2 text-sm border rounded-lg px-4 py-1.5 break-all overflow-hidden">
                                    {resource.link}
                                </p>
                            </main>
                            <DialogFooter>
                                <GroupButtonsWrapper className="flex-wrap">
                                    <DeleteResourceButton
                                        resourceId={resource.id}
                                    />
                                    <CopyResourceLinkButton
                                        link={resource.link}
                                    />
                                </GroupButtonsWrapper>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                ))}
                <Card id="new-resource-card-loader" className="hidden"></Card>
            </div>
        </ModalWrapper>
    );
};

export default Resources;
