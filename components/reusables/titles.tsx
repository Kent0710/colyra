export const PageTitle = ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-2xl font-bold">{children}</h1>
);

export const PageTitleDescription = ({ children }: { children: React.ReactNode }) => (
    <p className="text-muted-foreground">{children}</p>
);

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-lg font-semibold">{children}</h2>
);

export const SectionDescription = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm text-muted-foreground">{children}</p>
);