import AppHeader from "@/components/app-header";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-screen">
            <AppHeader />

            {/* Parent is flex-col with h-screen, so main gets bounded height */}
            <main className="flex-1 min-h-0 overflow-y-auto mt-[3rem] lg:mt-0 lg:py-[1.5rem] py-[1rem] ">
                {children}
            </main>

            {/* <BottomBar /> */}
        </div>
    );
}
