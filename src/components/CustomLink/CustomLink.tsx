import * as React from 'react';

import { NavLink } from 'react-router-dom';
import Text from 'components/Text';

import { CustomLinkProps } from 'utils/types/NavTypes';

import customLinkStyles from './CustomLink.module.scss';

const CustomLink: React.FC<CustomLinkProps> = ({ link }: CustomLinkProps) => {
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
      className={({ isActive }) =>
        isActive ? `${customLinkStyles.link} ${customLinkStyles.link_active}` : customLinkStyles.link
      }
    >
      {({ isActive }) => (
        <Text view="p-18" weight={isHovered || isActive ? 'bold' : 'medium'}>
          {link.name}
        </Text>
      )}
    </NavLink>
  );
};

export default CustomLink;
