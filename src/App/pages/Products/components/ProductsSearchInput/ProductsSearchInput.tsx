import * as React from 'react';

import { Button, Input, Text } from '@components/index';

import { ProductsSearchInputProps } from '@utils/types/ProductTypes';

export const ProductsSearchInput: React.FC<ProductsSearchInputProps> = ({ className, defaultValue, onSearch }) => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleInputChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className={className || ''}>
      <Input
        value={searchValue}
        defaultValue={defaultValue}
        onChange={handleInputChange}
        placeholder="Search product"
      />
      <Button onClick={() => onSearch(searchValue)}>
        <Text view="button">Find now</Text>
      </Button>
    </div>
  );
};
