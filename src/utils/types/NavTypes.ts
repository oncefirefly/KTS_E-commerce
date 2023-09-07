export type NavLink = {
  path: string;
  name: string;
};

export type CustomLinkProps = {
  link: NavLink;
};

export type NavBarProps = {
  className?: string;
  navBarLinks: NavLink[];
};
