import StackBlitzButton from "@/component/markdown/StackBlitzButton";
import type { TreeNode } from "@/Interface/example";
import { FaFile, FaFolder } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { SiAngular, SiHtml5, SiJavascript, SiReact, SiSvelte, SiTypescript, SiVite, SiVuedotjs } from "react-icons/si";
import { VscJson } from "react-icons/vsc";
import { NavLink } from "react-router";
import ShikiHighlighter from "react-shiki";

function FileTreeIconName({ fileName }: { fileName: string }) {
  switch (fileName) {
    case "vite.config.js":
    case "vite.config.ts":
      return <SiVite />;
    case "svelte.config.js":
      return <SiSvelte />;
    case "angular.json":
      return <SiAngular />;
    default:
      return <FilTreeIcon fileName={fileName} />;
  }
}

function FilTreeIcon({ fileName }: { fileName: string }) {
  const ext = fileName.substring(fileName.lastIndexOf(".") + 1);
  switch (ext) {
    case "tsx":
      return <SiReact />;
    case "ts":
      return <SiTypescript />;
    case "js":
      return <SiJavascript />;
    case "json":
      return <VscJson />;
    case "html":
      return <SiHtml5 />;
    case "svelte":
      return <SiSvelte />;
    case "vue":
      return <SiVuedotjs />;
    default:
      return <FaFile />;
      break;
  }
}

function FileTree({ nav, root, library, path, parent }: { nav: TreeNode[]; root?: boolean; library: string; path: string; parent: string }) {
  return (
    <ul className={`${root ? "menu overflow-auto" : ""} w-full h-full`}>
      {nav &&
        nav.map((item) => {
          return (
            <li key={item.path}>
              {item.type === "dir" ? (
                <details open>
                  <summary>
                    <FaFolder />
                    {item.name}
                  </summary>
                  {item.children && <FileTree nav={item.children} library={library} path={path} parent={(parent ? parent + "/" : "") + item.name} />}
                </details>
              ) : (
                <NavLink to={`/${library}/examples/${path}?file=${parent ? parent + "/" : ""}${item.name}`}>
                  <FileTreeIconName fileName={item.name} /> {item.name}
                </NavLink>
              )}
            </li>
          );
        })}
    </ul>
  );
}

interface FileManagerProps {
  title: string;
  library: string;
  path: string;
  nav: TreeNode[];
  fileData: string;
  fileName: string;
}

export default function FileManager({ title, library, path, nav, fileData, fileName }: FileManagerProps) {
  const ext = fileName.substring(fileName.lastIndexOf(".") + 1);
  return (
    <div className="flex flex-col w-full m-4">
      <div className="h-16 bg-base-100 border border-base-300 flex justify-between items-center-safe px-3 sticky top-0 z-9 rounded-t-xl">
        <div className="flex gap-1">
          <GoDotFill size={24} color="var(--color-base-300)" />
          <GoDotFill size={24} color="var(--color-base-300)" />
          <GoDotFill size={24} color="var(--color-base-300)" />
        </div>
        <div>
          <h1 className="text-xl">{title}</h1>
        </div>
        <div>
          <StackBlitzButton lib={library} path={path} file={"package.json"} />
        </div>
      </div>
      <div className="grow grid grid-cols-12 border-l border-b border-r border-base-300 rounded-b-xl">
        <div className="border-r p-2 border-base-300 col-span-3">
          <FileTree nav={nav} library={library} path={path} root={true} parent="" />
        </div>
        <div className="col-span-9 h-[calc(100dvh-98px)] overflow-auto">
          <ShikiHighlighter children={fileData} language={ext} theme={"min-light"} showLanguage={false} showLineNumbers={true} />
        </div>
      </div>
    </div>
  );
}
