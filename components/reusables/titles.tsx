export const PageTitle = ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-2xl font-bold text-primary">{children}</h1>
);

export const PageTitleDescription = ({ children }: { children: React.ReactNode }) => (
    <p className="text-muted-foreground">{children}</p>
);

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-lg font-semibold text-primary">{children}</h2>
);

export const SectionSubTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-md font-medium">{children}</h3>
);

export const SectionDescription = ({ children }: { children: React.ReactNode }) => (
    <p className="text-sm text-muted-foreground">{children}</p>
);