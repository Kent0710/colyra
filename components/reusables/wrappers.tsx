export const PageWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`px-8 lg:px-16 space-y-4 ${className} flex-1 flex flex-col`}
    >
        {children}
    </div>
);

export const PageHeaderWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <header className={`${className}`}>
      
        {children}
    </header>
);

export const SectionHeaderWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <section className={`${className}`}>
        {children}
    </section>
);

export const GroupButtonsWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`${className ? className : "space-x-2 flex items-center"}`}>
        {children}
    </div>
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
