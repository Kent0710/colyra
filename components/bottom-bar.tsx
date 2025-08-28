"use client";

import { useMemo } from "react";
import { Home, LayoutGrid, PanelRightOpen, User } from "lucide-react";
import Link from "next/link";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

const BottomBar = () => {
    const pathname = usePathname();

    const items = useMemo(
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
                title: "Account",
                url: "/account",
                icon: User,
                active: pathname === "/account",
            },
        ],
        [pathname]
    );

    return (
        <div className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-2 ">
            <nav className=" w-full">
                <ul className="flex justify-around items-center">
                    {items.map((item) => (
                        <li key={item.title}>
                            <Link
                                href={item.url}
                                className={`flex flex-col items-center text-gray-600 hover:text-purple-600 ${
                                    item.active && "border-b-2 border-purple-600 text-purple-600 rounded-[3px] px-1 pb-1"
                                }`}
                            >
                                <item.icon className="w-6 h-6" />
                                <span className="text-xs font-medium">
                                    {item.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Sheet>
                            <SheetTrigger>
                                <div className="flex flex-col items-center text-gray-600 hover:text-purple-600">
                                    <PanelRightOpen />
                                    <span className="text-xs font-medium">
                                        Sidebar
                                    </span>
                                </div>{" "}
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>
                                        Are you absolutely sure?
                                    </SheetTitle>
                                    <SheetDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default BottomBar;
