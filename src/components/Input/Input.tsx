import classNames from 'classnames';
import * as React from 'react';

import { InputProps } from '@utils/types/InputTypes';

import inputStyles from './Input.module.scss';

export const Input: React.FC<InputProps> = ({
  id,
  value,
  defaultValue,
  onChange,
  afterSlot,
  placeholder,
  className,
  disabled,
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <label
      htmlFor={id}
      className={classNames(inputStyles.input_label, {
        [`${className}`]: className,
        [inputStyles.focused]: isFocused,
        [inputStyles.disabled]: disabled,
      })}
    >
      <input
        id={id}
        type="text"
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        {...props}
      />
      {afterSlot}
    </label>
  );
};
