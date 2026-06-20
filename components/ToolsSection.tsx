import { digitalTools, traditionalTools } from "@/lib/tools";
import { toolsSectionContent } from "@/lib/content";
import Badge from "./Badge";

export default function ToolsSection() {
    return (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
                <h3 className="font-display text-base tracking-wide text-accent uppercase">
                    {toolsSectionContent.digitalHeading}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                    {digitalTools.map((tool) => (
                        <Badge key={tool.id}>{tool.name}</Badge>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-display text-base tracking-wide text-accent uppercase">
                    {toolsSectionContent.traditionalHeading}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                    {traditionalTools.map((tool) => (
                        <Badge key={tool.id}>{tool.name}</Badge>
                    ))}
                </div>
            </div>
        </div>
    );
}
