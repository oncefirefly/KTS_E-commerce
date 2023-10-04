import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { CartIcon, LogoIcon, UserIcon, LogoutIcon } from '@components/icons/index';
import { NavBar, Text } from '@components/index';

import { headerRoutes } from '@config/routes/routes';

import { userDataStore, cartStore } from '@store/instance';

import headerStyles from './Header.module.scss';

export const Header: React.FC = observer(() => {
  return (
    <>
      <header className={headerStyles.header}>
        <div className={classNames(headerStyles.header_content, 'content_wrapper')}>
          <LogoIcon />
          <NavBar className={headerStyles.header_nav} navBarLinks={headerRoutes} />
          <div className={headerStyles.header_profile}>
            {userDataStore.userData.uid !== 'guest' && (
              <Text>{userDataStore.userData.displayName || userDataStore.userData.email}</Text>
            )}
            <Link to="/cart" className={headerStyles.header_cart}>
              {cartStore.cartCount > 0 && <div className={headerStyles.header_cart_count}>{cartStore.cartCount}</div>}
              <CartIcon />
            </Link>
            {userDataStore.userData.uid === 'guest' ? (
              <Link to="/login">
                <UserIcon />
              </Link>
            ) : (
              <button className={headerStyles.header_logout} onClick={() => userDataStore.logout()}>
                <LogoutIcon />
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
});
