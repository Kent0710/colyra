import { PageTitle, PageTitleDescription } from "@/components/reusables/titles";
import {
    PageHeaderWrapper,
    PageWrapper,
} from "@/components/reusables/wrappers";
import SpaceActionsButtons from "@/components/space-actions-buttons";
import { SpacesLoader } from "@/components/spaces";

const HomePage = () => {
    return (
        <PageWrapper>
            <PageHeaderWrapper>
                <PageTitle>Home</PageTitle>
                <PageTitleDescription>
                    Create and manage your spaces.
                </PageTitleDescription>
            </PageHeaderWrapper>
            <SpaceActionsButtons />
            <SpacesLoader />
        </PageWrapper>
    );
};

export default HomePage;
