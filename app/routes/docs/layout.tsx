import { TabProvider } from "@/component/markdown/MarkdownTabs";
import NavigationMenu from "@/component/NavigationMenu";
import type { docsApiLayoutItems } from "@/Interface/doc";
import type { RouteLoaderParams } from "@/Interface/route-loader-params";
import { docsApiLayoutLoader } from "@/loader/docs.loader";
import { FaCalendarAlt } from "react-icons/fa";
import { Outlet, useLoaderData } from "react-router";

export async function loader(loadArgs: RouteLoaderParams) {
  var layoutLoaderData = await docsApiLayoutLoader(loadArgs);
  return layoutLoaderData;
}

export default function DocsLayout() {
  const { menu, path: markdown, library } = useLoaderData<docsApiLayoutItems>();
  return (
    <div className="drawer mx-auto lg:drawer-open bg-base-100">
      <input id="api-drawer-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center relative">
        <TabProvider>
          <Outlet />
        </TabProvider>
      </div>
      <div className="drawer-side dvh">
        <label htmlFor="api-drawer-sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
        <h1 className="capitalize w-full text-4xl flex justify-between my-4 pe-4 ps-6">
          {library}
          {library == "calendar" && <FaCalendarAlt className="inline ms-2" />}
        </h1>
        <NavigationMenu menu={menu} path={markdown} />
      </div>
    </div>
  );
}
