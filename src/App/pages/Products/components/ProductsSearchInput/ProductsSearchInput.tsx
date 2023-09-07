import * as React from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';

import { ProductsSearchInputProps } from 'utils/types/ProductsSearchInputTypes';

const ProductsSearchInput: React.FC<ProductsSearchInputProps> = (props) => {
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

export default ProductsSearchInput;
