import { getSpaceById } from "@/actions/space";
import { PageTitle, PageTitleDescription } from "@/components/reusables/titles";
import {
    PageHeaderWrapper,
    PageWrapper,
} from "@/components/reusables/wrappers";
import RealtimeChat from "@/features/realtime-chat/realtime-chat";
import Resources from "@/features/resources/resources";

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
        <PageWrapper>
            <PageHeaderWrapper>
                <PageTitle> {space.name} </PageTitle>
                <PageTitleDescription>
                    {" "}
                    Manage this space and collaborate with others.{" "}
                </PageTitleDescription>
            </PageHeaderWrapper>
            <main className="grid grid-cols-5 gap-4 flex-1">
                <RealtimeChat className="col-span-2" spaceId={spaceId} />
                <Resources className="col-span-3" spaceId={spaceId} />
            </main>
        </PageWrapper>
    );
};

export default SingleSpacePage;
