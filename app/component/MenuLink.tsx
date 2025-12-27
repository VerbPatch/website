import React from "react";
import type { IconType } from "react-icons";
import { GoDotFill } from "react-icons/go";
import { LuPlus } from "react-icons/lu";
import { NavLink } from "react-router";

interface MenuLinkProps {
  to: string;
  icon?: IconType;
  children?: React.ReactNode;
  addIcon?: boolean;
}

const MenuLink: React.FC<MenuLinkProps> = ({ to, icon: Icon, children, addIcon = false }) => (
  <NavLink to={to} className={({ isActive, isPending }) => " peer " + [isActive ? "menu-active" : "", isPending ? "menu-pending" : ""].join(" ").trim()} viewTransition>
    <GoDotFill size={18} className="animate-ping menu-spinner" />
    {Icon && <Icon size={18} className="menu-icon" />}
    {children}
  </NavLink>
);

export default MenuLink;
