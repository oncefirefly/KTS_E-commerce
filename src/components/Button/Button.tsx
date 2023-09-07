import * as React from 'react';

import { ButtonProps } from 'utils/types/ButtonTypes';

import buttonStyles from './Button.module.scss';

const Button: React.FC<ButtonProps> = ({ children, className, disabled, onClick, ...props }) => {
  const [buttonIsHovered, setButtonIsHovered] = React.useState(false);

  return (
    <button
      type="button"
      className={`${buttonStyles.button}${disabled ? ` ${buttonStyles.disabled}` : ''}${
        className ? ` ${className}` : ''
      }${buttonIsHovered ? ` ${buttonStyles.hovered}` : ''}`}
      disabled={disabled}
      onClick={onClick}
      onMouseOver={() => setButtonIsHovered(true)}
      onMouseOut={() => setButtonIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
