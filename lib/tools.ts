export interface Tool {
  id: string;
  name: string;
  category: "digital" | "traditional";
  icon?: string;
}

export const tools: Tool[] = [
  { id: "d1", name: "Clip Studio Paint", category: "digital" },
  { id: "d2", name: "Aseprite", category: "digital" },
  { id: "d3", name: "Huion H320M", category: "digital" },
  { id: "t1", name: "Watercolor", category: "traditional" },
  { id: "t2", name: "Colored Pencils", category: "traditional" },
  { id: "t3", name: "Technical Pens", category: "traditional" },
  { id: "t4", name: "Dip Pens", category: "traditional" },
  { id: "t5", name: "Fountain Pens", category: "traditional" },
  { id: "t6", name: "Graphite", category: "traditional" },
];

export const digitalTools = tools.filter((tool) => tool.category === "digital");
export const traditionalTools = tools.filter(
  (tool) => tool.category === "traditional",
);
