import type { AnchorProps } from "@/Interface/doc";
import type { ReactElement } from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { NavLink } from "react-router";

const A = ({ href = "", children, ...rest }: AnchorProps): ReactElement => {
  const external = href.toLowerCase().startsWith("https://");
  return (
    <NavLink to={href} target={external ? "_blank" : "_self"} {...rest} viewTransition>
      {children}
      {external && <FaExternalLinkSquareAlt className="inline ms-1" />}
    </NavLink>
  );
};
export default A;
