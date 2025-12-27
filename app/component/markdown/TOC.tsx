import type { TocProps } from "@/Interface/doc";
import type { ReactElement } from "react";
import { NavLink } from "react-router";

export function TOC({ headings }: { headings: TocProps[] }) {
  const renderHeadings = (items: typeof headings, root: boolean = true): ReactElement | null => {
    if (!items.length) return null;

    return (
      <ul className={root ? "h-dvh" : "menu w-full"}>
        {items.map((h) => (
          <li key={h.id}>
            {root ? <h2 className="menu-title">On this Page</h2> : <NavLink to={`#${h.id}`}>{h.text}</NavLink>}
            {h.children && h.children.length > 0 && renderHeadings(h.children, false)}
          </li>
        ))}
      </ul>
    );
  };

  return renderHeadings(headings);
}
