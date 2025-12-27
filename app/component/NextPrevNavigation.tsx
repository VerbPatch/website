import type { BottomNavLink, BottomNavProps, Menu } from "@/Interface/doc";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavLink, useRouteLoaderData } from "react-router";

interface NPNavprops {
  library: string;
  path: string;
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
            <NavLink to={navigation.prev.link} className="np group flex align-center gap-2 items-center-safe px-4 hover:bg-base-300 relative text-base-content">
              <FaChevronLeft size={28} />
              <div className="text-2xl hidden lg:group-hover:block overflow-hidden whitespace-nowrap">{navigation.prev.title}</div>
            </NavLink>
          ) : (
            <span />
          )}
          <h1 className="col-span-10 flex content-center items-center-safe">{title}</h1>
          {navigation.next ? (
            <NavLink to={navigation.next.link} className="np group flex align-center gap-2 items-center-safe px-4 hover:bg-base-300 text-base-content">
              <div className="text-2xl hidden lg:group-hover:block overflow-hidden whitespace-nowrap">{navigation.next.title}</div>
              <FaChevronRight size={28} />
            </NavLink>
          ) : (
            <span />
          )}
        </div>
      )}
    </>
  );
}
