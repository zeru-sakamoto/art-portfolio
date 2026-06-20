import type { Metadata } from "next";
import ToolsSection from "@/components/ToolsSection";
import { aboutContent } from "@/lib/content";

export const metadata: Metadata = {
  title: aboutContent.title,
  description: aboutContent.description,
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-2xl tracking-wide text-heading-light sm:text-3xl">
        {aboutContent.heading}
      </h1>

      <div className="mt-6 flex flex-col gap-4 font-body text-base text-paragraph-light/80 sm:text-lg">
        {aboutContent.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-lg tracking-wide text-heading-light">
          {aboutContent.toolsHeading}
        </h2>
        <div className="mt-6">
          <ToolsSection />
        </div>
      </div>
    </section>
  );
}
