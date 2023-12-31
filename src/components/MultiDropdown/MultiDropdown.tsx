import classNames from 'classnames';
import * as React from 'react';

import { ArrowDownIcon } from '@components/icons/index';
import { Input } from '@components/index';

import { useClickOutside } from '@utils/hooks/useClickOutside';
import { MultiDropdownProps, Option } from '@utils/types/MultiDropdownTypes';

import dropdownStyles from './MultiDropdown.module.scss';

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  id,
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  ...props
}) => {
  const [inputValue, setInputValue] = React.useState(value.length ? getTitle(value) : '');

  const [dropdownIsOpen, setDropdownIsOpen] = React.useState(false);
  const [shownOptions, setShownOptions] = React.useState(options);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const optionIsSelected = (option: Option): boolean => {
    return value.filter((v) => v.key === option.key).length > 0;
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);

    setShownOptions(options.filter((option) => option.value.toLowerCase().includes(value.toLowerCase())));
  };

  const handleOptionClick = (option: Option) => {
    const isSelected = value.filter((v) => v.key === option.key).length > 0;

    if (isSelected) {
      onChange(value.filter((v) => v.key !== option.key));
      return;
    }

    onChange([...value, option]);
  };

  useClickOutside(dropdownRef, () => {
    setDropdownIsOpen(false);
  });

  React.useMemo(() => {
    setShownOptions(options);
  }, [options]);

  React.useMemo(() => {
    if (dropdownIsOpen) {
      setInputValue('');
    } else {
      setInputValue(value.length ? getTitle(value) : '');
    }
  }, [dropdownIsOpen, getTitle, value]);

  return (
    <div
      className={classNames(dropdownStyles.dropdown_container, { [`${className}`]: className })}
      ref={dropdownRef}
      {...props}
    >
      <Input
        id={id}
        className={dropdownStyles.dropdown_input}
        value={inputValue}
        placeholder={getTitle(value)}
        onChange={handleInputChange}
        onClick={() => {
          setInputValue('');
          setDropdownIsOpen(true);
        }}
        afterSlot={
          <ArrowDownIcon
            className={classNames(dropdownStyles.dropdown_arrow, {
              [dropdownStyles.dropdown_arrow_rotate]: dropdownIsOpen,
            })}
            color="secondary"
          />
        }
        disabled={disabled}
      />
      {!disabled && (
        <ul
          className={classNames(dropdownStyles.dropdown, {
            [dropdownStyles.dropdown_shown]: dropdownIsOpen,
          })}
        >
          {!disabled &&
            shownOptions.map((option) => (
              <li
                className={classNames({ [dropdownStyles.selected]: optionIsSelected(option) })}
                key={option.key}
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
