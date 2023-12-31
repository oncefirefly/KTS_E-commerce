import * as React from 'react';

import { IconWrapper } from '@components/icons/index';

import { getIconColor } from '@utils/functions/getIconColor';

import { IconProps } from '@utils/types/IconTypes';

export const ArrowDownIcon: React.FC<IconProps> = ({ className, color }) => {
  return (
    <IconWrapper className={className || ''} width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill={color ? getIconColor(color) : 'currentColor'}
      />
    </IconWrapper>
  );
};
