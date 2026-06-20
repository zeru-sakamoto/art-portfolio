"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteContent } from "@/lib/content";
import { scrollToSameHash } from "@/lib/scrollToHash";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-accent/15 bg-bg-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-2xl tracking-wider text-heading-light"
        >
          <Image
            src="/Logo-icon.png"
            alt=""
            width={28}
            height={28}
            style={{ imageRendering: "pixelated" }}
            className="relative -top-0.5"
          />
          <span>
            {siteContent.name}
            <span className="text-accent">{siteContent.nameAccent}</span>
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-6">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={(e) => scrollToSameHash(e, href, pathname)}
                    className={`font-display text-xl tracking-wide uppercase transition-colors duration-200 ${
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
