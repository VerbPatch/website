import type { Menu, MenuItem } from "@/Interface/doc";
import MenuLink from "./MenuLink";
import { NavLink } from "react-router";
import { SiGithub } from "react-icons/si";
import { HiOutlineClipboardDocument } from "react-icons/hi2";

const InnerList = ({ appendGroup, title, open, children, group }: { appendGroup: boolean; title: string; open: boolean; children: MenuItem[]; group: string }) => {
  return (
    <>
      {appendGroup && (
        <li>
          <h3 className="menu-title capitalize text-xl divider divider-start">{group}</h3>
        </li>
      )}

      <li>
        <details open={open}>
          <summary>
            <span>{title}</span>
          </summary>
          <ul className="">
            {children.map(({ title, path }, iindex) => (
              <li key={`${iindex}`}>
                <MenuLink
                  to={path}
                  children={
                    <>
                      <span>{title}</span>
                    </>
                  }
                />
              </li>
            ))}
          </ul>
        </details>
      </li>
    </>
  );
};

export default function NavigationMenu({ menu, path, library }: { menu: Menu[]; path?: string; library: string }) {
  let _group = menu[0].group;

  return (
    <ul className="menu pt-2 w-80 bg-base-100 dvh text-base-content ">
      <li>
        <h3 className="menu-title text-xl divider divider-start">Docs</h3>
      </li>
      {menu.map(({ title, children, group }, index) => {
        const open = children.filter((child) => child.path.indexOf(path || "-1") > -1).length > 0;

        let appendGroup = false;
        if (_group != group) {
          _group = group;
          appendGroup = true;
        }
        return <InnerList key={index} appendGroup={appendGroup} title={title} open={open} children={children} group={_group} />;
      })}
      <li>
        <h3 className="menu-title text-xl divider divider-start">External</h3>
      </li>
      <li>
        <NavLink target="_blank" to={`https://github.com/VerbPatch/headless-${library}`}>
          <SiGithub /> Github
        </NavLink>
      </li>
      <li>
        <NavLink to={`/${library}/change-log`} className={path === "/change-log" ? "menu-active" : ""}>
          <HiOutlineClipboardDocument /> Change log
        </NavLink>
      </li>
    </ul>
  );
}
