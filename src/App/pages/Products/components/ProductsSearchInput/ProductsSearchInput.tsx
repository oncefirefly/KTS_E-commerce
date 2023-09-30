import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, Input, Text } from '@components/index';

import { paramsFromEntries } from '@utils/functions/paramsFromEntries';
import { ProductsSearchInputProps } from '@utils/types/ProductTypes';

export const ProductsSearchInput: React.FC<ProductsSearchInputProps> = ({ className, onSearch }) => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = React.useState('');

  const handleInputChange = (value: string) => {
    setSearchValue(value);
  };

  React.useMemo(() => {
    const searchParamsData = paramsFromEntries(searchParams);

    if (searchParamsData.search) setSearchValue(searchParamsData.search);
  }, [searchParams]);

  return (
    <div className={className || ''}>
      <Input value={searchValue} onChange={handleInputChange} placeholder="Search product" />
      <Button onClick={() => onSearch(searchValue)}>
        <Text view="button">Find now</Text>
      </Button>
    </div>
  );
};
