import * as React from 'react';

import NavBar from 'components/NavBar/NavBar';

import CartIcon from 'components/icons/CartIcon';
import LogoIcon from 'components/icons/LogoIcon';
import UserIcon from 'components/icons/UserIcon';

import { headerRoutes } from 'config/routes/routes.ts';

import 'styles/styles.scss';
import headerStyles from './Header.module.scss';

const Header: React.FC = () => {
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

export default Header;
