import * as React from 'react';

import { IconWrapper } from '@components/icons/index';

import { getIconColor } from '@utils/functions/getIconColor';
import { IconProps } from '@utils/types/IconTypes';

export const ArrowLeftIcon: React.FC<IconProps> = (props) => {
  return (
    <IconWrapper width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
        stroke={props.color ? getIconColor(props.color) : 'currentColor'}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconWrapper>
  );
};
