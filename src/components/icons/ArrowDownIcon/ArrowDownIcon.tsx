import * as React from 'react';

import IconWrapper from 'components/icons/IconWrapper';

import { getIconColor } from 'utils/functions/getIconColor';

import { IconProps } from 'utils/types/IconTypes';

const ArrowDownIcon: React.FC<IconProps> = (props) => {
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

export default ArrowDownIcon;
{
  /* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M2.83569 8.74741L4.16442 7.25259L12.5001 14.662L20.8357 7.25259L22.1644 8.74741L12.5001 17.338L2.83569 8.74741Z"
    fill="#AFADB5"
  />
</svg>; */
}
