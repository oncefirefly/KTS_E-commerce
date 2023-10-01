import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { CartIcon, LogoIcon, UserIcon } from '@components/icons/index';
import { NavBar, Text } from '@components/index';

import { headerRoutes } from '@config/routes/routes';

import { HeaderProps } from '@utils/types/HeaderTypes';

import headerStyles from './Header.module.scss';

export const Header: React.FC<HeaderProps> = ({ userName }) => {
  return (
    <header className={headerStyles.header}>
      <div className={classNames(headerStyles.header_content, 'content_wrapper')}>
        <LogoIcon />
        <NavBar className={headerStyles.header_nav} navBarLinks={headerRoutes} />
        <div className={headerStyles.header_profile}>
          <Text>{userName}</Text>
          <CartIcon />
          {!userName && (
            <Link to="/login">
              <UserIcon />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
