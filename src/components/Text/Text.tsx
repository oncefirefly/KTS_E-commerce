import * as React from 'react';

import { TextProps } from 'utils/types/TextPropsTypes';

import textStyles from './Text.module.scss';

const Text: React.FC<TextProps> = ({ className, view, tag = 'p', weight, children, color, maxLines }: TextProps) => {
  const CustomTag = tag;

  return (
    <CustomTag
      className={`${className || ''}${view ? ` ${textStyles[`view-${view}`]}` : ''}${
        weight ? ` ${textStyles[`weight-${weight}`]}` : ''
      }${color ? ` ${textStyles[`color-${color}`]}` : ''}`}
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

export default Text;
