import type { BottomNavLink, BottomNavProps, Menu } from "@/Interface/doc";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavLink, useRouteLoaderData } from "react-router";

interface NPNavprops {
  library: string;
  path?: string;
  isAPI: boolean;
  title: string;
}

export function NextPrevNavigation({ library, path, isAPI, title }: NPNavprops) {
  const { menu: nav } = useRouteLoaderData("docs-layout");
  const [navigation, setNavigation] = useState<BottomNavProps>();

  useEffect(() => {
    if (Array.isArray(nav)) {
      const allMenus: BottomNavLink[] = [];
      nav.forEach((menu) => {
        if (Array.isArray(menu.children)) {
          menu.children.forEach((child: any) => {
            allMenus.push({ title: child.title, link: child.path });
          });
        }
      });

      const index = allMenus.findIndex((item) => item.link === `/${library}/docs/${path}`);

      setNavigation({
        prev: index > 0 ? allMenus[index - 1] : null,
        next: index < allMenus.length - 1 ? allMenus[index + 1] : null,
      });
    }
  }, [nav, path]);

  return (
    <>
      {navigation && (
        <div className="sticky top-0 bg-base-100 z-9 flex text-sm shadow-xl w-full">
          {navigation.prev ? (
            <div className="tooltip tooltip-right flex lign-center gap-2 items-center-safe px-4 hover:bg-base-300">
              <div className="tooltip-content bg-base-300 text-base-content py-5 rounded-none -translate-x-4 z-10 text-2xl">
                <div>{navigation.prev.title}</div>
              </div>
              <NavLink to={navigation.prev.link} role="button" className="np">
                <FaChevronLeft size={28} />
              </NavLink>
            </div>
          ) : (
            <span />
          )}
          <h1 className="col-span-10 flex items-center-safe">{title}</h1>
          {navigation.next ? (
            <div className="tooltip tooltip-left flex lign-center gap-2 items-center-safe px-4 hover:bg-base-300">
              <div className="tooltip-content bg-base-300 text-base-content py-5 rounded-none translate-x-4 z-10 text-2xl">
                <div>{navigation.next.title}</div>
              </div>
              <NavLink to={navigation.next.link} role="button" className="np">
                <FaChevronRight size={28} />
              </NavLink>
            </div>
          ) : (
            <span />
          )}
        </div>
      )}
    </>
  );
}
