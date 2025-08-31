import { getSpaceById } from "@/actions/space";
import { PageTitle, PageTitleDescription } from "@/components/reusables/titles";
import {
    GroupButtonsWrapper,
    PageHeaderWrapper,
    PageWrapper,
} from "@/components/reusables/wrappers";
import RealtimeChat from "@/features/realtime-chat/realtime-chat";
import Resources from "@/features/resources/resources";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Settings2, Users } from "lucide-react";
import Members from "@/features/members/members";
import { Suspense } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

interface SingleSpacePageProps {
    params: {
        spaceId: string;
    };
}
const SingleSpacePage: React.FC<SingleSpacePageProps> = async ({ params }) => {
    const spaceId = (await params).spaceId;
    const { space } = await getSpaceById(spaceId);

    if (!space) {
        return <div>Space not found</div>;
    }

    return (
        <PageWrapper className="h-full">
            <PageHeaderWrapper className="flex items-center justify-between">
                <div>
                    <PageTitle> {space.name} </PageTitle>
                    <PageTitleDescription>
                        {" "}
                        Manage this space and collaborate with others.{" "}
                    </PageTitleDescription>
                </div>
                <GroupButtonsWrapper>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="hidden lg:inline-flex">
                                <Users /> Members
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="rounded-l-xl">
                            <SheetTitle className="hidden"></SheetTitle>
                            <Members
                                spaceId={spaceId}
                                className="border-none"
                            />
                        </SheetContent>
                    </Sheet>

                    <Button>
                        {" "}
                        <Settings2 />{" "}
                    </Button>
                </GroupButtonsWrapper>
            </PageHeaderWrapper>
            <Tabs defaultValue="resources" className="lg:hidden h-full">
                <TabsList>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                    <TabsTrigger value="chat">Space Chat</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="h-full">
                    <Suspense fallback={<div>Loading chat...</div>}>
                        <RealtimeChat
                            spaceId={spaceId}
                            className="h-full flex flex-col"
                        />
                    </Suspense>
                </TabsContent>
                <TabsContent value="resources">
                    <Suspense fallback={<div>Loading resources...</div>}>
                        <Resources spaceId={spaceId} className="border-none " />
                    </Suspense>
                </TabsContent>
                <TabsContent value="members">
                    <Suspense fallback={<div>Loading members...</div>}>
                        <Members spaceId={spaceId} className="border-none" />
                    </Suspense>
                </TabsContent>
            </Tabs>
            <main className="grid-cols-5 gap-4 flex-1 hidden lg:grid">
                <RealtimeChat className="col-span-2 " spaceId={spaceId} />
                <Resources
                    className="col-span-5 lg:col-span-3"
                    spaceId={spaceId}
                />
            </main>
        </PageWrapper>
    );
};

export default SingleSpacePage;
