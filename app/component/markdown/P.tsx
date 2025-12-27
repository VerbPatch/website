import { Children, type ReactElement } from "react";

const P = ({ children }: React.HTMLAttributes<HTMLParagraphElement>): ReactElement => {
  const paragraph = Children.toArray(children);
  if (paragraph.length === 2 && paragraph[0] === "Defined in: ") {
    return <span className="source">{children}</span>;
  } else {
    return <p>{children}</p>;
  }
};
export default P;
