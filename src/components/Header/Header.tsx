import classNames from 'classnames';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CartIcon, LogoIcon, UserIcon } from '@components/icons/index';
import { NavBar, PopupWrapper, Text, ModalWindow } from '@components/index';

import { headerRoutes } from '@config/routes/routes';

import { useOverflow } from '@utils/hooks/useOverflow';
import { HeaderProps } from '@utils/types/HeaderTypes';

import headerStyles from './Header.module.scss';

export const Header: React.FC<HeaderProps> = ({ userName }) => {
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const handleCartIconClick = () => {
    if (!userName) {
      setModalIsOpen(true);
      return;
    }

    navigate('/cart');
  };

  useOverflow(modalIsOpen);

  return (
    <>
      <header className={headerStyles.header}>
        <div className={classNames(headerStyles.header_content, 'content_wrapper')}>
          <LogoIcon />
          <NavBar className={headerStyles.header_nav} navBarLinks={headerRoutes} />
          <div className={headerStyles.header_profile}>
            <Text>{userName}</Text>
            <CartIcon onClick={handleCartIconClick} />
            {!userName && (
              <Link to="/login">
                <UserIcon />
              </Link>
            )}
          </div>
        </div>
      </header>
      {modalIsOpen && (
        <PopupWrapper>
          <ModalWindow
            type="confirm"
            title="Alert"
            text="This action requires authentication."
            onClose={() => setModalIsOpen(false)}
            onConfirm={() => {
              setModalIsOpen(false);
              navigate('/login');
            }}
          />
        </PopupWrapper>
      )}
    </>
  );
};
