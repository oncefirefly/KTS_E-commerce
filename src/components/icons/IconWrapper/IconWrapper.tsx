import * as React from 'react';

import { IconProps } from 'utils/types/IconTypes';

const IconWrapper: React.FC<React.PropsWithChildren<IconProps>> = (props) => {
  return (
    <svg
      className={props.className}
      width={props.width || 24}
      height={props.height || 24}
      viewBox={props.viewBox}
      fill={props.fill}
      {...props}
    >
      {props.children}
    </svg>
  );
};

export default IconWrapper;
