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
import { SpacesLoader } from "@/components/spaces";
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
            <ModalWrapper className="border-none">
                <div className="flex items-center justify-between">
                    <SectionTitle> Your Spaces </SectionTitle>
                    <Button variant={'outline'}>
                        <Filter /> Filter
                    </Button>
                </div>
                <SpacesLoader />
            </ModalWrapper>
        </PageWrapper>
    );
};

export default HomePage;
