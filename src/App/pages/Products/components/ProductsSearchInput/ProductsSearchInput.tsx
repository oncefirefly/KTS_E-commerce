import * as React from 'react';

import { Button, Input, Text } from 'components/';

import { ProductsSearchInputProps } from 'utils/types/ProductTypes';

export const ProductsSearchInput: React.FC<ProductsSearchInputProps> = (props) => {
  const [searchValue, setSearchValue] = React.useState('');

  const handleInputChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className={props.className || ''}>
      <Input value={searchValue} onChange={handleInputChange} placeholder="Search product" />
      <Button onClick={() => props.onSearch(searchValue)}>
        <Text view="button">Find now</Text>
      </Button>
    </div>
  );
};
