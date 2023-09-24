import * as React from 'react';

import { CartIcon, LogoIcon, UserIcon } from '@components/icons/index';

import { NavBar } from '@components/index';

import { headerRoutes } from '@config/routes/routes';

import headerStyles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={headerStyles.header}>
      <div className={`${headerStyles.header_content} content_wrapper`}>
        <LogoIcon />
        <NavBar className={headerStyles.header_nav} navBarLinks={headerRoutes} />
        <div className={headerStyles.header_profile}>
          <CartIcon />
          <UserIcon />
        </div>
      </div>
    </header>
  );
};
