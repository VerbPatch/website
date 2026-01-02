import FileManager from "@/component/FileManager";
import type { ExampleItem } from "@/Interface/example";
import type { ExampleRLParams } from "@/Interface/route-loader-params";
import { exampleLoader } from "@/loader/docs.loader";
import { useLoaderData } from "react-router";
import type { Route } from "./+types";

export async function loader(loadArgs: ExampleRLParams) {
  const url = new URL(loadArgs.request.url);
  loadArgs.file = url.searchParams.get("file") || "package.json";
  const example = loadArgs.params["*"];
  var response = await exampleLoader(loadArgs);
  response.title = example?.replace("/", " ") as string;
  response.description = example?.replace("/", " ") as string;
  response.fileName = loadArgs.file;
  return response;
}

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: loaderData.title }, { name: "og:title", content: loaderData.title }, { name: "description", content: loaderData.description }];
}

export default function Index() {
  const { library, path, nav, fileData, fileName } = useLoaderData<ExampleItem>();

  return <FileManager library={library} path={path} nav={nav} fileData={fileData} fileName={fileName} />;
}
