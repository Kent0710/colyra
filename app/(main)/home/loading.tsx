import { Skeleton } from "@/components/ui/skeleton";
import { PageWrapper, PageHeaderWrapper } from "@/components/reusables/wrappers";

const HomePageLoader = () => {
    return (
        <PageWrapper>
            <PageHeaderWrapper>
                <Skeleton className="h-8 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
            </PageHeaderWrapper>
            <main className="flex-1 flex flex-col lg:justify-center lg:items-center">
                <Skeleton className="h-64 w-full lg:w-1/2 mb-4" />
                <Skeleton className="h-64 w-full lg:w-1/2" />
            </main>
        </PageWrapper>
    )
};



export default HomePageLoader;