const gitDownloadUrl = 'https://raw.githubusercontent.com/VerbPatch';

const joinPath = (...segments: string[]): string => {
    const joined = segments
        .filter(Boolean)
        .join('/')
        .replace(/\\/g, '/');

    return joined.replace(/([^:]\/)\/+/g, '$1');
};

const buildPath = (isProduction: boolean, pathSegments: string[]): string =>
    joinPath(isProduction ? gitDownloadUrl : '', ...pathSegments);

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
        return "N/A";
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
