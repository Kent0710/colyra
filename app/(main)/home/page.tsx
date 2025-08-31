import {
    PageTitle,
    PageTitleDescription,
    SectionTitle,
} from "@/components/reusables/titles";
import {
    ModalWrapper,
    PageHeaderWrapper,
    PageWrapper,
} from "@/components/reusables/wrappers";
import SpaceActionsButtons from "@/components/space-actions-buttons";
import SpacesLoader from "@/components/spaces-loader";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

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
