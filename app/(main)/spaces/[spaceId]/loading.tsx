import {
    PageHeaderWrapper,
    PageWrapper,
} from "@/components/reusables/wrappers";
import { Skeleton } from "@/components/ui/skeleton";

const SingleSpacePageLoader = () => {
    return (
        <PageWrapper>
            <PageHeaderWrapper>
                <Skeleton className="h-8 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </PageHeaderWrapper>
            <main className="grid-cols-5 gap-4 flex-1 hidden lg:grid">
                <Skeleton className="col-span-2 h-[70vh]" />
                <Skeleton className="col-span-5 lg:col-span-3 h-[70vh]" />
            </main>
        </PageWrapper>
    );
};

export default SingleSpacePageLoader;
