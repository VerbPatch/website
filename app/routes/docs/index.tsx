import MarkdownRenderer from "@/component/MarkdownRenderer";
import type { docsApiItems, TocProps } from "@/Interface/doc";
import type { RouteLoaderParams } from "@/Interface/route-loader-params";
import { mdxCompiledFile } from "@/lib/mdxUtil";
import { docsApiLoader } from "@/loader/docs.loader";
import { useLoaderData } from "react-router";

export async function loader(loadArgs: RouteLoaderParams) {
  const isAPI = loadArgs.params["*"]?.startsWith("api/");
  var response = await docsApiLoader(loadArgs, isAPI ? "api" : "doc");
  const file = await mdxCompiledFile(response.doc);
  response.mdxComponent = String(file);
  response.toc = file.data.headings as TocProps[];

  return response;
}

export default function Index() {
  const { library, path, toc, title, description, mdxComponent } = useLoaderData<docsApiItems>();

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <MarkdownRenderer path={path} library={library} toc={toc} mdxComponent={mdxComponent} title={title} />
    </>
  );
}
