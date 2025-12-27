import { Children, type ReactElement } from "react";

export const H1 = ({ children }: React.HTMLAttributes<HTMLHeadingElement>): ReactElement => {
  const headingText = Children.toArray(children);
  return <h1 style={{ display: "none" }}>{headingText[1]}</h1>;
};

export const H4 = ({ children }: React.HTMLAttributes<HTMLHeadingElement>): ReactElement => {
  const headingText = Children.toArray(children);
  return <h4>{headingText[1]}</h4>;
};

export const H5 = ({ children }: React.HTMLAttributes<HTMLHeadingElement>): ReactElement => {
  const headingText = Children.toArray(children);
  return <h5>{headingText[1]}</h5>;
};

export const H6 = ({ children }: React.HTMLAttributes<HTMLHeadingElement>): ReactElement => {
  const headingText = Children.toArray(children);
  return <h6>{headingText[1]}</h6>;
};
