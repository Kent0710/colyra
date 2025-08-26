import { SidebarTrigger } from "../ui/sidebar";

export const PageWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`p-8 space-y-4 ${className} min-h-screen flex flex-col`}>
        {children}
    </div>
);

export const PageHeaderWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => (
    <header className="flex items-center gap-4 ">
        <SidebarTrigger />
        <div>{children}</div>
    </header>
);

export const SectionHeaderWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => <section className={className}>{children}</section>;

export const GroupButtonsWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`${className ? className : "space-x-2"}`}>{children}</div>
);

export const ModalWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`${className} p-4 rounded-lg border space-y-4`}>
        {children}
    </div>
);
