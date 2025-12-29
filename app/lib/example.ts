import { readdir } from "node:fs/promises";
import { headers, readFile } from "./doc";
import type { TreeNode } from "@/Interface/example";
const env = import.meta.env;
const gitApiURL = 'https://api.github.com/repos/VerbPatch';
const localPath = env.VITE_SOURCE_ROOT_PATH;
const skipDir = ['node_modules', '.angular', '.svelte-kit', 'dist', 'build'];

interface GitContentNode {
    name: string;
    path: string;
    type: string;
    url: string;
    download_url: string;
}

const recursiveTree = async (isProd: boolean, gitFolderpath: string): Promise<GitContentNode[]> => {
    if (isProd) {
        const response = await fetch(gitFolderpath, {
            headers: headers
        });
        return (response.ok ? response.json() : []) as GitContentNode[];
    }
    else {
        console.log({ gitFolderpath })
        var files = await readdir(gitFolderpath, { withFileTypes: true });

        const response = files.filter(f => skipDir.indexOf(f.name) === -1).map((item) => {
            return {
                name: item.name,
                download_url: !item.isDirectory() ? item.parentPath + '\\' + item.name : '',
                path: item.parentPath + '\\' + item.name,
                type: item.isDirectory() ? 'dir' : 'file',
                url: item.parentPath + '\\' + item.name
            } as GitContentNode
        }) as GitContentNode[];

        return response;
    }
}

async function buildTree(isProd: boolean, gitFolderpath: string) {
    const entries = await recursiveTree(isProd, gitFolderpath);

    const root: TreeNode[] = [];
    for (const entry in entries) {
        const item = entries[entry];
        const updatedItem = {
            name: item.name,
            path: item.path,
            url: item.url,
            download_url: item.type === 'file' ? item.download_url : "",
            type: item.type === "dir" ? 'dir' : 'file',
        } as TreeNode;

        if (item.type === 'dir') {
            updatedItem.children = await buildTree(isProd, item.url);
        }
        root.push(updatedItem);
    }

    return root;
}


export function buildBreadcrumbs(path: string) {
    if (!path) return []

    const parts = path.split("/")

    return parts.map((part, i) => ({
        name: part,
        path: parts.slice(0, i + 1).join("/")
    }))
}

export const exampleData = async (library: string, examplePath: string, file: string) => {
    var isProd = env.PROD;
    const gitFolderJson = isProd ?
        `${gitApiURL}/headless-${library}/contents/examples/${examplePath}?ref=main`
        : `${localPath}\\headless-${library}\\examples\\${examplePath.replace('/', '\\')}`;

    const data = await buildTree(isProd, gitFolderJson);
    const sorted = data.sort((a, b) => a.type.charCodeAt(0) - b.type.charCodeAt(0));
    const fileData = await readFile(isProd, [
        `headless-${library}`,
        'examples',
        `${examplePath.replace('/', '\\')}`,
        file]);


    return { nav: sorted, fileData };
}