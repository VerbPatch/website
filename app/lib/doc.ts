import fs from 'node:fs/promises';

const env = import.meta.env;
const gitDownloadUrl = 'https://raw.githubusercontent.com/VerbPatch';
const localPath = env.VITE_SOURCE_ROOT_PATH;

export const headers = {
    Accept: "application/vnd.github+json",
    Authorization: "Bearer " + env.VITE_GITHUB_PAT
}

const joinPath = (...segments: string[]): string => {
    return segments
        .filter(Boolean)
        .join('/')
        .replace(/\/+/g, '/')
        .replace(/\\/g, '/');
};

const buildPath = (isProduction: boolean, pathSegments: string[]): string =>
    joinPath(isProduction ? gitDownloadUrl : localPath, ...pathSegments);

export const readFile = async (isProduction: boolean, pathSegments: string[]): Promise<string> => {
    const filePath = buildPath(isProduction, pathSegments);

    if (isProduction) {
        try {
            const response = await fetch(filePath);
            return response.ok ? await response.text() : "N/A";
        } catch (err) {
            console.error('Error fetching remote file:', err);
            return "N/A";
        }
    } else {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            return String(content);
        } catch (err) {
            console.error('Error reading local file:', err);
            return "N/A";
        }
    }
};

const readJsonFile = async <T = any>(isProduction: boolean, pathSegments: string[]): Promise<T> => {
    const filePath = buildPath(isProduction, pathSegments);

    if (isProduction) {
        try {
            const response = await fetch(filePath, {
                headers: headers
            });
            return response.ok ? await response.json() : [] as T;
        } catch (err) {
            console.error('Error fetching remote JSON:', err);
            return [] as T;
        }
    } else {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(content);
        } catch (err) {
            console.error('Error reading local JSON:', err);
            return [] as T;
        }
    }
};

//example file will always be from live environment in MarkdownTabs when clicked on tabs in client side
export const getExampleFile = async (library: string, filePath: string) => {
    return readFile(true, [
        `headless-${library}`,
        'refs/heads/main',
        'examples',
        filePath
    ]);
};

export const docApiNavigationJson = async (library: string) => {
    return readJsonFile(env.PROD, [
        `headless-${library}`,
        env.PROD ? 'refs/heads/main' : '',
        'docs',
        'navigation.json'
    ]);
};

export const apiMarkdownFile = async (library: string, api: string) => {
    return readFile(env.PROD, [
        `headless-${library}`,
        env.PROD ? 'refs/heads/main' : '',
        'docs',
        `${api}.md`
    ]);
};

export const docMarkdownFile = async (library: string, docName: string) => {
    return readFile(env.PROD, [
        `headless-${library}`,
        env.PROD ? 'refs/heads/main' : '',
        'docs',
        `${docName}.mdx`
    ]);
};

export const changelogMarkdownFile = async (library: string) => {
    return readFile(env.PROD, [
        `headless-${library}`,
        env.PROD ? 'refs/heads/main' : '',
        `CHANGELOG.md`
    ]);
};