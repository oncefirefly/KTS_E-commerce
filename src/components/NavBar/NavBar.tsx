import * as React from 'react';

import CustomLink from 'components/CustomLink';

import { NavBarProps } from 'utils/types/NavTypes';

import navBarStyles from './NavBar.module.scss';

const NavBar: React.FC<NavBarProps> = (props) => {
  return (
    <nav className={`${navBarStyles.nav}${props.className ? ` ${props.className}` : ''}`}>
      {props.navBarLinks.map((link) => (
        <CustomLink key={link.path} link={link} />
      ))}
    </nav>
  );
};

export default NavBar;
