import Slugger from 'github-slugger';
const rehypeExtractHeadings = () => (tree: any, file: any) => {
    const slugger = new Slugger();
    const headingStack: any[] = [];

    const gatherText = (node: any): string => {
        if (!node) return "";
        if (typeof node === "string") return node;
        if (node.type === "text") return node.value || "";
        if (node.children && Array.isArray(node.children)) {
            return node.children.map(gatherText).join("");
        }
        return "";
    };

    const walk = (node: any) => {
        if (!node) return;
        if (Array.isArray(node)) {
            node.forEach(walk);
            return;
        }

        if (["h1", "h2", "h3"].indexOf(node.tagName) > -1) {
            const text = (node.children || []).map(gatherText).join("").trim().substr(1);
            if (!text) return;
            const id = slugger.slug(text);
            const level = parseInt(node.tagName[1]);

            const heading = { id, text, children: [], level };
            while (headingStack.length > 0 && headingStack[headingStack.length - 1].level >= level) {
                headingStack.pop();
            }

            if (headingStack.length > 0) {
                headingStack[headingStack.length - 1].node.children.push(heading);
            }

            headingStack.push({ level, node: heading });
        } else {
            if (node.children) node.children.forEach(walk);
        }
    };

    walk(tree);

    const rootHeadings = headingStack.filter((h) => h.level === 1).map((h) => h.node);
    if (rootHeadings.length === 0 && headingStack.length > 0) {
        const minLevel = Math.min(...headingStack.map((h) => h.level));
        file.data.headings = headingStack.filter((h) => h.level === minLevel).map((h) => h.node);
    } else {
        file.data.headings = rootHeadings;
    }
};

export default rehypeExtractHeadings;