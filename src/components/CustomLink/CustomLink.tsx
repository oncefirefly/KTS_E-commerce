import classNames from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { Text } from '@components/index';

import { CustomLinkProps } from '@utils/types/NavTypes';

import customLinkStyles from './CustomLink.module.scss';

export const CustomLink: React.FC<CustomLinkProps> = ({ link }: CustomLinkProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <NavLink
      to={link.path}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={({ isActive }) => classNames(customLinkStyles.link, { [customLinkStyles.link_active]: isActive })}
    >
      {({ isActive }) => (
        <Text view="p-18" weight={isHovered || isActive ? 'bold' : 'medium'}>
          {link.name}
        </Text>
      )}
    </NavLink>
  );
};
