import classNames from 'classnames';
import * as React from 'react';

import { ButtonProps } from '@utils/types/ButtonTypes';

import buttonStyles from './Button.module.scss';

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  color = 'primary',
  onClick,
  ...props
}) => {
  return (
    <button
      type="button"
      className={classNames(buttonStyles.button, {
        [buttonStyles.disabled]: disabled,
        [`${buttonStyles[color]}`]: color,
        [`${className}`]: className,
      })}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
