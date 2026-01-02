import MarkdownRenderer from "@/component/MarkdownRenderer";
import type { SEO } from "@/Interface/doc";
import type { RouteLoaderParams } from "@/Interface/route-loader-params";
import { mdxCompiledFile } from "@/lib/mdxUtil";
import { changeLogLoader } from "@/loader/docs.loader";
import { useLoaderData } from "react-router";
import type { Route } from "./+types";

interface changeLogProps extends SEO {
  mdxComponent: string;
  library: string;
}

export async function loader(loadArgs: RouteLoaderParams) {
  let library = loadArgs.params["library"] || "N/A";
  var changeLog = await changeLogLoader(loadArgs);
  const file = await mdxCompiledFile(changeLog);

  return { library, mdxComponent: String(file), title: `${library} change log`, description: `${library} change log` } as changeLogProps;
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: loaderData.title }, { name: "og:title", content: loaderData.title }, { name: "description", content: loaderData.description }];
}

export default function ChangeLog() {
  const { title, mdxComponent, library } = useLoaderData<changeLogProps>();

  return <MarkdownRenderer library={library} mdxComponent={mdxComponent} title={title} />;
}
