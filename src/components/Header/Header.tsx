import * as React from 'react';
import { Link } from 'react-router-dom';

import Text from 'components/Text';
import LogoIcon from 'components/icons/LogoIcon';

const Header: React.FC = () => {
  return (
    <div>
      <div>
        <LogoIcon />
        <nav>
          <Link to="/">
            <Text view="p-18" weight="medium">
              Products
            </Text>
          </Link>
          <Link to="/categories">
            <Text view="p-18" weight="medium">
              Categories
            </Text>
          </Link>
          <Link to="/about_us">
            <Text view="p-18" weight="medium">
              About us
            </Text>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
