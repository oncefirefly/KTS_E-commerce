import * as React from 'react';

import { IconWrapper } from 'components/icons/';

import { getIconColor } from 'utils/functions/getIconColor';

import { IconProps } from 'utils/types/IconTypes';

export const ArrowDownIcon: React.FC<IconProps> = (props) => {
  return (
    <IconWrapper width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill={props.color ? getIconColor(props.color) : 'currentColor'}
      />
    </IconWrapper>
  );
};
