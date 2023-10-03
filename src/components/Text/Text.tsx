import classNames from 'classnames';
import * as React from 'react';

import { TextProps } from '@utils/types/TextTypes';

import textStyles from './Text.module.scss';

export const Text: React.FC<TextProps> = ({
  className,
  view,
  tag = 'p',
  weight,
  children,
  color,
  maxLines,
}: TextProps) => {
  const CustomTag = tag;

  return (
    <CustomTag
      className={classNames(textStyles.text, {
        [textStyles[`view-${view}`]]: view,
        [textStyles[`weight-${weight}`]]: weight,
        [textStyles[`color-${color}`]]: color,
        [`${className}`]: className,
      })}
      style={
        maxLines
          ? {
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: maxLines,
              lineClamp: maxLines,
              WebkitBoxOrient: 'vertical',
            }
          : {}
      }
    >
      {children}
    </CustomTag>
  );
};
