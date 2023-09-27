import * as React from 'react';

import { IconProps } from '@utils/types/IconTypes';

export const IconWrapper: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  width,
  height,
  viewBox,
  fill,
  children,
  ...props
}) => {
  return (
    <svg className={className} width={width || 24} height={height || 24} viewBox={viewBox} fill={fill} {...props}>
      {children}
    </svg>
  );
};
