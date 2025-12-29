import FileManager from "@/component/FileManager";
import type { ExampleItem } from "@/Interface/example";
import type { ExampleRLParams } from "@/Interface/route-loader-params";
import { exampleLoader } from "@/loader/docs.loader";
import { useLoaderData } from "react-router";

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

export default function Index() {
  const { library, path, nav, title, description, fileData, fileName } = useLoaderData<ExampleItem>();

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <FileManager library={library} title={title} path={path} nav={nav} fileData={fileData} fileName={fileName} />
    </>
  );
}
