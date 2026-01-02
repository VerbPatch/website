import type { TreeNode } from "./example";

export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href?: string;
    children?: React.ReactNode;
}

export interface BottomNavLink {
    title: string;
    link: string;
}

export interface HeadingPositionLink {
    line: number;
    column: number;
    offset: number;
}

export interface HeadingItemProps {
    start: HeadingPositionLink;
    end: HeadingPositionLink;
}


export interface BottomNavProps {
    next: BottomNavLink | null;
    prev: BottomNavLink | null;
}

export interface MarkdownRendererProps {
    title: string;
    path?: string;
    library: string;
    toc?: TocProps[];
    mdxComponent: any;
}

interface docsBase {
    library: string;
    path: string;
}

export interface docMarkdown extends docsBase {
    doc: string;
    mdxComponent?: any;
    toc: TocProps[];
}

export interface TocProps {
    id: string;
    text: string;
    children: TocProps[];
    level: number
}

export interface docsApiItems extends docMarkdown, SEO {
}

export interface docsApiLayoutItems extends docsBase {
    menu: Menu[];
}

export interface Menu {
    title: string;
    group: string;
    children: MenuItem[];
}

export interface MenuItem {
    title: string;
    kind: number;
    path: string;
    isDeprecated: boolean;
}

export interface SEO {
    title: string;
    description: string;
}
