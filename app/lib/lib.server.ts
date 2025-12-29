import fs from 'node:fs/promises';

async function readFile(filePath: string) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return String(content);
    } catch (err) {
        console.error('Error reading local file:', err);
        return "N/A";
    }
}