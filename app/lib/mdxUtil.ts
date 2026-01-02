import { compile } from "@mdx-js/mdx";
import { fromHtmlIsomorphic } from "hast-util-from-html-isomorphic";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import type { PluggableList } from "unified";
import rehypeExtractHeadings from "./rehypeExtractHeadings";
import type { MDXComponents } from "mdx/types";
import MarkdownTabs, { Tab } from "@/component/markdown/MarkdownTabs";
import { SiReact, SiSvelte, SiVuedotjs, SiAngular, SiJquery, SiLit, SiPreact, SiQwik, SiSolid, SiJavascript } from 'react-icons/si';
import A from "@/component/markdown/A";
import { H1, H4, H5, H6 } from "@/component/markdown/H";
import P from "@/component/markdown/P";
import Code, { CodeBlock } from "@/component/markdown/Code";

export const mdxCompiledFile = async (doc: string) => {
    const plugins: PluggableList = [
        [rehypeSlug],
        [
            rehypeAutolinkHeadings,
            {
                behavior: "prepend",
                content: fromHtmlIsomorphic("#", { fragment: true }).children,
                properties: {
                    class: "heading-link",
                },
            },
        ],
        [rehypeExtractHeadings],
    ];

    const file = await compile(doc, {
        outputFormat: "function-body",
        format: "mdx",
        remarkPlugins: [[remarkFrontmatter]],
        rehypePlugins: plugins,
        development: false,
    });
    return file;
};

export const getMdxComponents = (includeCode: boolean) => {
    const myComponent: MDXComponents = {
        MarkdownTabs: MarkdownTabs,
        CodeBlock: CodeBlock,
        Tab: Tab,
        SiReact: SiReact,
        SiVuedotjs: SiVuedotjs,
        SiSvelte: SiSvelte,
        SiAngular: SiAngular,
        SiJquery: SiJquery,
        SiLit: SiLit,
        SiPreact: SiPreact,
        SiQwik: SiQwik,
        SiSolid: SiSolid,
        SiJavascript: SiJavascript,
        a: A,
        h1: H1,
        h4: H4,
        h5: H5,
        h6: H6,
        p: P,
    };

    if (includeCode) {
        myComponent.code = Code;
    }

    return myComponent;
}