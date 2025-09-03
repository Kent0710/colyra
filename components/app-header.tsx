"use client";

import { GroupButtonsWrapper } from "./reusables/wrappers";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    CircleQuestionMark,
    File,
    HelpCircle,
    Home,
    LayoutGrid,
    Mail,
    PanelRightOpen,
    PhoneCall,
    Rocket,
    Sticker,
    Terminal,
    User,
} from "lucide-react";

import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import SearchSpace from "./search-space";

const AppHeader = () => {
    const isMobile = useIsMobile();

    if (isMobile) return <MobileHeader />;
    return <DesktopHeader />;
};

export default AppHeader;

const DesktopHeader = () => {
    return (
        <header className="bg-purple-50 border-b py-2 px-5 items-center justify-between flex gap-10">
            <section className="flex items-center space-x-8 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                <nav>
                    <ul className="flex items-center space-x-2">
                        <li>
                            <Button variant={"secondary"}>
                                <Link href={"/home"}>
                                    <Rocket />{" "}
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button variant={"secondary"}>
                                <Link href={"/home"}>
                                    <Home />{" "}
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button variant={"secondary"}>
                                <Link href={"/spaces"}>
                                    <LayoutGrid />{" "}
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
                <div className="lg:flex items-center space-x-4 hidden">
                    <small className="text-xs font-medium">
                        {" "}
                        Explore more apps by{" "}
                        <span className="border-b-2 text-blue-600 border-blue-600">
                            {" "}
                            CHLS Software and Design{" "}
                        </span>{" "}
                    </small>
                </div>
            </section>

            <section>
                <GroupButtonsWrapper>
                    <SearchSpace />
                    <Button> Feedback </Button>
                    <Button variant={"secondary"}>
                        {" "}
                        <Mail />{" "}
                    </Button>
                    <Button variant={"secondary"}>
                        {" "}
                        <CircleQuestionMark />{" "}
                    </Button>
                    <Button variant={"secondary"}>
                        {" "}
                        <User />{" "}
                    </Button>
                </GroupButtonsWrapper>
            </section>
        </header>
    );
};

const MobileHeader = () => {
    const pathname = usePathname();

    const navs = useMemo(
        () => [
            {
                title: "Home",
                url: "/home",
                icon: Home,
                active: pathname === "/home",
            },
            {
                title: "Spaces",
                url: "/spaces",
                icon: LayoutGrid,
                active: pathname === "/spaces",
            },
            {
                title: "Mail",
                url: "/mails",
                icon: Mail,
                active: pathname === "/spaces",
            },
            {
                title: "Help",
                url: "/help",
                icon: HelpCircle,
                active: pathname === "/help",
            },
            {
                title: "Contact",
                url: "/contact",
                icon: PhoneCall,
                active: pathname === "/contact",
            },
            {
                title: "Terms",
                url: "/terms",
                icon: Terminal,
                active: pathname === "/terms",
            },
            {
                title: "Account",
                url: "/account",
                icon: User,
                active: pathname === "/account",
            },
        ],
        [pathname]
    );

    const [open, setOpen] = React.useState(false);

    return (
        <header className="fixed h-12 w-full bg-primary text-white rounded-b-lg shadow-lg border-b mr-[10rem] py-2 px-5 flex items-center justify-between ">
            <div className="flex items-center gap-2">
                <File />
                <p className="font-bold"> Colyra </p>
            </div>
            <GroupButtonsWrapper>
                <SearchSpace />
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"headerButton"}>
                            <PanelRightOpen />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="rounded-l-xl w-[18rem]">
                        <SheetHeader className="border-b pb-3">
                            <SheetTitle>Navigations</SheetTitle>
                        </SheetHeader>
                        <main>
                            <nav>
                                <ul className="flex flex-col gap-2 text-sm">
                                    {navs.map((nav) => (
                                        <li
                                            key={nav.title}
                                            onClick={() => setOpen(false)}
                                        >
                                            <Link
                                                href={nav.url}
                                                className={`  
                                                    flex items-center gap-3 text-neutral-700 mx-[1rem] px-3 py-2 rounded-lg transition 
                                                    ${
                                                        nav.active
                                                            ? "text-purple-600 bg-purple-100"
                                                            : "hover:opacity-70 hover:bg-purple-50"
                                                    }  
                                                `}
                                            >
                                                <nav.icon size={17} />
                                                <p className="font-medium">
                                                    {nav.title}
                                                </p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </main>
                    </SheetContent>
                </Sheet>
            </GroupButtonsWrapper>
        </header>
    );
};
