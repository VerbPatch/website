import type { SEO } from "./doc"

export type TreeNode = {
    name: string
    path: string
    url: string
    download_url: string
    type: "file" | "dir"
    children?: TreeNode[],
    fileContent?: string
}

export interface ExampleItem extends SEO {
    library: string;
    path: string;
    nav: TreeNode[];
    fileData: string;
    fileName: string;
}