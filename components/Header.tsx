"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteContent } from "@/lib/content";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-accent/15 bg-bg-dark/80 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="font-display text-lg tracking-wider text-heading-light">
                    {siteContent.name}
                    <span className="text-accent">{siteContent.nameAccent}</span>
                </Link>

                <nav>
                    <ul className="flex items-center gap-6">
                        {navLinks.map(({ href, label }) => {
                            const isActive = pathname === href;
                            return (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className={`font-display text-base tracking-wide uppercase transition-colors duration-200 ${
                                            isActive
                                                ? "text-accent"
                                                : "text-paragraph-light/80 hover:text-accent"
                                        }`}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
