import type { Menu } from "@/Interface/doc";
import MenuLink from "./MenuLink";

export default function NavigationMenu({ menu, path }: { menu: Menu[]; path: string }) {
  let _group = menu[0].group;
  return (
    <ul className="menu pt-2 w-80 bg-base-100 dvh text-base-content">
      <li>
        <h3 className="menu-title text-xl divider divider-start">Docs</h3>
      </li>
      {menu.map(({ title, children, group }, index) => {
        const open = children.filter((child) => child.path.indexOf(path) > -1).length > 0;
        let appendGroup = false;
        if (_group != group) {
          _group = group;
          appendGroup = true;
        }

        return (
          <>
            {appendGroup && (
              <li>
                <h3 className="menu-title capitalize text-xl divider divider-start">{_group}</h3>
              </li>
            )}

            <li key={index}>
              <details open={open}>
                <summary>
                  <span>{title}</span>
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
          </>
        );
      })}
    </ul>
  );
}
