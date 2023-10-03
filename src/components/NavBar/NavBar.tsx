import classNames from 'classnames';
import * as React from 'react';

import { CustomLink } from '@components/index';

import { NavBarProps } from '@utils/types/NavTypes';

import navBarStyles from './NavBar.module.scss';

export const NavBar: React.FC<NavBarProps> = ({ className, navBarLinks }) => {
  return (
    <nav className={classNames(navBarStyles.nav, { [`${className}`]: className })}>
      {navBarLinks.map((link) => (
        <CustomLink key={link.path} link={link} />
      ))}
    </nav>
  );
};
