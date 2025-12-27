import type { MarkdownRendererProps } from "@/Interface/doc";
import { run } from "@mdx-js/mdx";
import type { MDXContent } from "mdx/types";
import { useEffect, useState } from "react";
import { FaListAlt } from "react-icons/fa";
import * as runtime from "react/jsx-runtime";
import { TOC } from "./markdown/TOC";
import { getMdxComponents } from "@/lib/mdxUtil";
import { NextPrevNavigation } from "./NextPrevNavigation";

export default function MarkdownRenderer({ path, library, toc, mdxComponent, title }: MarkdownRendererProps) {
  const isAPI = () => path.startsWith("api/");

  const [ClientComponent, setClientComponent] = useState<MDXContent | null>(null);

  useEffect(() => {
    async function initMDX() {
      try {
        const { default: MDXContent } = await run(mdxComponent, {
          ...runtime,
          baseUrl: import.meta.url,
        });
        setClientComponent(() => MDXContent);
      } catch (error) {
        console.error("MDX Runtime Error:", error);
      }
    }

    if (mdxComponent) initMDX();
  }, [mdxComponent]);

  return (
    <div className="grid grid-cols-6  relative w-full mb-2">
      <article className="w-full col-span-6 lg:col-span-5 h-full pb-4 px-4">
        <div className="shadow-xl rounded prose prose-sm md:prose-base w-full pb-4 pt-0">
          <NextPrevNavigation path={path} library={library} isAPI={isAPI()} title={title} />
          <label htmlFor="api-drawer-sidebar" className="btn drawer-button lg:hidden absolute z-99 right-0">
            <FaListAlt />
          </label>
          {ClientComponent && <ClientComponent components={getMdxComponents(isAPI())} />}
        </div>
      </article>
      <div className="sticky top-0 overflow-y-auto h-dvh w-full hidden lg:block">
        <TOC headings={toc} />
      </div>
    </div>
  );
}
