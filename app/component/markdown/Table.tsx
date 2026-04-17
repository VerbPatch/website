import type { TocProps } from "@/Interface/doc";
import type { ReactElement } from "react";
import { NavLink } from "react-router";

export function Table({ children }: React.HTMLAttributes<HTMLTableElement>) {
  console.log(children);
  return <table>{children}</table>;
}
