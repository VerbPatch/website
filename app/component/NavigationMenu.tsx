import type { Menu } from "@/Interface/doc";
import MenuLink from "./MenuLink";

export default function NavigationMenu({ menu, path }: { menu: Menu[]; path: string }) {
  return (
    <ul className="menu pt-2 w-80 bg-base-100 dvh text-base-content">
      {menu.map(({ title, children, group }, index) => {
        const open = children.filter((child) => child.path.indexOf(path) > -1).length > 0;
        return (
          <li key={index}>
            <details open={open}>
              <summary>
                <span>{title}</span>
                <span className="badge badge-sm float-end">{group}</span>
              </summary>
              <ul className="">
                {children.map(({ title, path }, iindex) => (
                  <li key={`${index}_${iindex}`}>
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
        );
      })}
    </ul>
  );
}
