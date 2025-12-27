import { getExampleFile } from "@/lib/doc";
import React, { useState, Children, isValidElement, type ReactNode, type ReactElement, useMemo, useEffect, createContext, useContext } from "react";
import type { IconType } from "react-icons";
import ShikiHighlighter from "react-shiki";
import ReactDOMServer from "react-dom/server";
import { TbCopy, TbCopyCheck } from "react-icons/tb";
import CopyCodeButton from "./CopyCodeButton";
import StackBlitzButton from "./StackBlitzButton";
import { decode } from "html-entities";

interface TabContextType {
  activeLabel: string;
  setActiveLabel: (label: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeLabel, setActiveLabel] = useState<string>("");

  return <TabContext.Provider value={{ activeLabel, setActiveLabel }}>{children}</TabContext.Provider>;
}

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabProvider");
  }
  return context;
};

export interface TabProps {
  active: boolean;
  label: string;
  icon: IconType;
  children: ReactNode;
  examplePath: string;
  sourcePath: string;
}

export interface TabsProps {
  children: React.ReactElement<TabProps>[];
  library: string;
}

export function Tab({ children }: TabProps) {
  return <div>{children}</div>;
}

export function MarkdownTabs({ children, library }: TabsProps) {
  const { activeLabel, setActiveLabel } = useTabContext();

  const tabs = useMemo(() => {
    return Children.toArray(children).filter((child): child is React.ReactElement<TabProps> => isValidElement(child) && (child.type as any) === Tab);
  }, [children]);

  const [activeTabContent, setActiveTabContent] = useState<string>("");
  const [activeLanguage, setActiveLanguage] = useState<string>("");
  const [exampleUrl, setExampleUrl] = useState<string>("");
  const [exampleFile, setExampleFile] = useState<string>("");

  const getLanguageFromUrl = (url: string): string => {
    const ext = url.split(".").pop()?.toLowerCase() || "javascript";
    const langMap: { [key: string]: string } = {
      tsx: "tsx",
      ts: "ts",
      jsx: "jsx",
      js: "js",
      vue: "vue",
      svelte: "svelte",
      bash: "shell",
    };
    return langMap[ext] || ext;
  };

  const extractLanguageFromClass = (node: ReactNode): string => {
    if (!isValidElement(node) || node.type !== "pre") return "";

    const codeChild = (node.props as any).children as ReactElement;
    if (!isValidElement(codeChild) || codeChild.type !== "code") return "";

    const className = ((codeChild.props as any).className as string) || "";
    const match = /language-(\w+)/.exec(className);

    return match ? match[1] : "";
  };

  const getCodeContent = (node: ReactNode): string => {
    if (!isValidElement(node) || node.type !== "pre") return "";

    const codeChild = (node.props as any).children as ReactElement;
    if (!isValidElement(codeChild) || codeChild.type !== "code") return "";

    const { children } = codeChild.props as React.HTMLAttributes<HTMLElement>;

    const rendered = ReactDOMServer.renderToString(children);
    console.log({ rendered: decode(rendered) });
    return decode(rendered);
  };

  const updateTabContent = async (label: string, examplePath: string, sourcePath: string, localContent: ReactNode) => {
    setActiveLabel(label);

    if (examplePath && sourcePath) {
      const remoteUrl = examplePath + "/" + sourcePath;
      const src = await getExampleFile(library, remoteUrl);
      console.log(src);
      setActiveTabContent(src);
      setActiveLanguage(getLanguageFromUrl(remoteUrl));
      setExampleUrl(examplePath);
      setExampleFile(sourcePath);
    } else {
      setActiveTabContent(getCodeContent(localContent));
      setActiveLanguage(extractLanguageFromClass(localContent));
      setExampleUrl("");
      setExampleFile("");
    }
  };

  useEffect(() => {
    const activeTab = tabs.find((tab) => tab.props.label === activeLabel) || tabs.find((tab) => tab.props.active) || tabs[0];
    if (activeTab) {
      updateTabContent(activeTab.props.label, activeTab.props.examplePath, activeTab.props.sourcePath, activeTab.props.children);
    }
  }, [tabs, library, activeLabel]);

  const handleTabClick = (tabProps: TabProps) => {
    updateTabContent(tabProps.label, tabProps.examplePath, tabProps.sourcePath, tabProps.children);
  };

  return (
    <div className="mx-6 px-0 border border-base-300 rounded">
      <div role="tab-list" className="tabs tabs-border border-b border-base-300 px-2">
        {tabs.map((tab) => {
          const Icon = tab.props.icon;
          return (
            <label key={tab.props.label} onClick={() => handleTabClick(tab.props)} className={`tab ${activeLabel === tab.props.label ? "tab-active" : ""} flex gap-1`}>
              {Icon as any}
              {tab.props.label}
            </label>
          );
        })}
      </div>
      <div className="bg-base-100 relative">
        {activeTabContent && (
          <>
            <div className="peer">
              <ShikiHighlighter children={activeTabContent.replace(/\n$/, "").trim()} language={activeLanguage} theme="min-light" className="w-full max-h-96 overflow-auto" showLanguage={false} />
            </div>
            <div className="absolute top-4 right-4 hidden peer-hover:flex hover:flex gap-2 z-8">
              {exampleUrl && <StackBlitzButton path={exampleUrl} lib={library} file={exampleFile} />}
              <CopyCodeButton code={String(activeTabContent)} classNames="cursor-pointer" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MarkdownTabs;
