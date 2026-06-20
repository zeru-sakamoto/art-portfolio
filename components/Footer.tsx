import Link from "next/link";
import { footerContent, navLinks, siteContent } from "@/lib/content";

export default function Footer() {
    return (
        <footer className="relative border-t border-accent/15 bg-bg-dark">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:justify-between">
                <div>
                    <p className="font-display text-base tracking-wider text-heading-light">
                        {siteContent.name}
                        <span className="text-accent">{siteContent.nameAccent}</span>
                    </p>
                    <p className="mt-2 max-w-xs text-base text-paragraph-light/70">
                        {footerContent.tagline}
                    </p>
                </div>

                <div className="flex gap-12">
                    <div>
                        <h3 className="font-display text-sm tracking-wide uppercase text-accent">
                            {footerContent.exploreHeading}
                        </h3>
                        <ul className="mt-3 flex flex-col gap-2 text-base text-paragraph-light/80">
                            {navLinks.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} className="hover:text-accent">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-display text-sm tracking-wide uppercase text-accent">
                            {footerContent.connectHeading}
                        </h3>
                        <ul className="mt-3 flex flex-col gap-2 text-base text-paragraph-light/80">
                            <li>
                                <a href={footerContent.email.href} className="hover:text-accent">
                                    {footerContent.email.label}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={footerContent.instagram.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent"
                                >
                                    {footerContent.instagram.label}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-accent/10">
                <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-4 px-6 py-6 text-sm text-paragraph-light/60 sm:flex-row">
                    <p>
                        &copy; {new Date().getFullYear()} {footerContent.copyrightHolder}. All rights
                        reserved.
                    </p>
                    <a href="#" className="font-display uppercase tracking-wide hover:text-accent">
                        {footerContent.backToTop}
                    </a>
                </div>
            </div>
        </footer>
    );
}
