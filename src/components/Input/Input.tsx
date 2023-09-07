import * as React from 'react';

import { InputProps } from 'utils/types/InputTypes';

import inputStyles from './Input.module.scss';

const Input: React.FC<InputProps> = ({ value, onChange, afterSlot, placeholder, className, disabled, ...props }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <label
      htmlFor="customInput"
      className={`${inputStyles.input_label}${className ? ` ${className}` : ''}${
        isFocused ? ` ${inputStyles.focused}` : ''
      }${disabled ? ` ${inputStyles.disabled}` : ''}`}
    >
      <input
        id="customInput"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {afterSlot}
    </label>
  );
};

export default Input;