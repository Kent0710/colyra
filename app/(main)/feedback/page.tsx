import {
    PageTitle,
    PageTitleDescription,
    SectionDescription,
    SectionTitle,
} from "@/components/reusables/titles";
import {
    ModalWrapper,
    PageHeaderWrapper,
    PageWrapper,
} from "@/components/reusables/wrappers";
import FeedbackForm from "./feedback-form";

const FeedbackPage = () => {
    return (
        <PageWrapper>
            <PageHeaderWrapper>
                <PageTitle> We Value Your Feedback </PageTitle>
                <PageTitleDescription>
                    The app is currently running in beta. Feedback will help
                    future version and products to improve and work well for our
                    users.{" "}
                </PageTitleDescription>
            </PageHeaderWrapper>
            <main className="space-y-4">
                <SectionTitle> Beta Version Feedback </SectionTitle>
                <FeedbackForm />
            </main>
        </PageWrapper>
    );
};

export default FeedbackPage;
