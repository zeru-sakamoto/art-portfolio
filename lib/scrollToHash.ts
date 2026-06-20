import type { MouseEvent } from "react";

// Intercepts same-page nav links (hash or plain path) so the scroll happens instantly
// instead of via the browser's native (CSS scroll-behavior: smooth) animated jump, which
// fights with GSAP ScrollTrigger's pinned hero animation on the home page. Cross-page
// links (different pathname) are left alone so next/link's normal navigation still runs.
export function scrollToSameHash(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string,
) {
  const hashIndex = href.indexOf("#");
  const targetPath = hashIndex === -1 ? href : href.slice(0, hashIndex) || "/";
  if (targetPath !== pathname) return;

  // No hash (e.g. clicking "Home" while already on "/") — same as "back to top".
  if (hashIndex === -1) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  const id = href.slice(hashIndex + 1);
  const el = document.getElementById(id);
  if (!el) return;

  event.preventDefault();

  // Scroll to the element's literal top rather than using scrollIntoView, which honors
  // scroll-margin-top (set on the gallery section to clear the sticky header on a direct
  // hash load). That margin would stop the scroll short of where the hero's pinned
  // ScrollTrigger timeline actually completes, leaving it stuck mid-fade.
  const targetY = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: targetY, behavior: "auto" });
}

// Always scrolls the current page to top, regardless of pathname — for the footer's
// standalone "Back to top" control, which isn't tied to a specific nav target.
export function scrollToPageTop(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "auto" });
}
