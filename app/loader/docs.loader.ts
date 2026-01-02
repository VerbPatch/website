import type { docsApiItems, docsApiLayoutItems, Menu } from "@/Interface/doc";
import type { ExampleItem, } from "@/Interface/example";
import type { ExampleRLParams, RouteLoaderParams } from "@/Interface/route-loader-params";
import { apiMarkdownFile, docMarkdownFile, docApiNavigationJson, changelogMarkdownFile } from "@/lib/doc";
import { exampleData, } from "@/lib/example";
import matter from "gray-matter";


export const docsApiLoader = async ({ params }: RouteLoaderParams, type: 'doc' | 'api'): Promise<docsApiItems> => {
    let library = params["library"] || "N/A";
    let path = params["*"] ?? "";

    let doc: string = '';
    if (type === 'api')
        doc = await apiMarkdownFile(library, path);
    else if (type === 'doc') {
        path = (path === '') ? 'introduction' : path;
        doc = await docMarkdownFile(library, path);
    }
    else
        throw new Response("Page not found", { status: 404 });

    if (doc === "N/A") {
        throw new Response("Page not found", { status: 404 });
    }
    const meta = matter(doc);

    const response = {
        path,
        library,
        doc,
        title: meta.data?.title,
        description: meta.data?.description
    } as docsApiItems;

    return response;
}

export const docsApiLayoutLoader = async ({ params, request }: RouteLoaderParams): Promise<docsApiLayoutItems> => {
    const library: string = params["library"] || "N/A";
    let path = params["*"] ?? "";
    const changeLog = (request.url.endsWith("/change-log"));
    let nav: Menu[] = await docApiNavigationJson(library);


    return {
        library,
        path: changeLog ? "/change-log" : path,
        menu: nav,
    } as docsApiLayoutItems;
}

export const exampleLoader = async ({ params, file }: ExampleRLParams,): Promise<ExampleItem> => {
    const library: string = params["library"] || "N/A";
    let path = params["*"] ?? "";

    const { nav, fileData } = await exampleData(library, path, file);

    return {
        library,
        path: path,
        nav,
        fileData
    } as ExampleItem;
}

export const changeLogLoader = async ({ params }: RouteLoaderParams) => {
    let library = params["library"] || "N/A";
    if (library === "N/A") {
        throw new Response("Page not found", { status: 404 });
    }

    var doc = await changelogMarkdownFile(library)

    return doc;
}