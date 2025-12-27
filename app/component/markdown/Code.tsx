import { Children, type ReactElement } from "react";
import ShikiHighlighter from "react-shiki";
import CopyCodeButton from "./CopyCodeButton";
import StackBlitzButton from "./StackBlitzButton";

const Code = (props: React.HTMLAttributes<HTMLElement>): ReactElement => {
  const { children, className, ...rest } = props;

  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    <div className="relative rounded">
      <ShikiHighlighter
        children={String(children).replace(/\n$/, "").trim()}
        language={className?.replace("language-", "")}
        theme="min-light"
        className="peer bg-transparent"
        showLineNumbers={true}
        showLanguage={false}
      ></ShikiHighlighter>
      <CopyCodeButton code={String(children)} classNames="absolute top-2 right-2 right-6 cursor-pointer hidden peer-hover:block hover:block" />
    </div>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
};

export const CodeBlock = (props: React.HTMLAttributes<HTMLElement>): ReactElement => {
  if (props.children) {
    const kids = Children.toArray(props.children) as ReactElement[];
    if (kids[0].type === "pre" && kids[0].props) {
      var kidsProps = kids[0].props as React.HTMLAttributes<HTMLElement>;
      if (kidsProps && kidsProps.children) {
        const grandKids = Children.toArray(kidsProps?.children) as ReactElement[];
        const { children, className, ...rest } = grandKids[0].props as React.HTMLAttributes<HTMLElement>;

        return (
          <div className="relative rounded">
            <ShikiHighlighter
              children={String(children).replace(/\n$/, "").trim()}
              language={className?.replace("language-", "")}
              theme="min-light"
              className="peer bg-transparent"
              showLineNumbers={true}
              showLanguage={false}
            ></ShikiHighlighter>
            <CopyCodeButton code={String(children)} classNames="absolute top-2 right-2 right-6 cursor-pointer hidden peer-hover:block hover:block" />
          </div>
        );
      }
    }
  }

  return <></>;
};

export default Code;
