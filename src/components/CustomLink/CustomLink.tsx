import * as React from 'react';

import { Link } from 'react-router-dom';
import Text from 'components/Text';

import { CustomLinkProps } from 'utils/types/NavTypes';

const CustomLink: React.FC<CustomLinkProps> = ({ link }: CustomLinkProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Link to={link.path} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <Text view="p-18" weight={isHovered ? 'bold' : 'medium'}>
        {link.name}
      </Text>
    </Link>
  );
};

export default CustomLink;
