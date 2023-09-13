import * as React from 'react';

import { MultiDropdown } from 'components/';

import { Option } from 'utils/types/MultiDropdownTypes';
import { ProductsMultiDropdownProps } from 'utils/types/ProductTypes';

export const ProductsMultiDropdown: React.FC<ProductsMultiDropdownProps> = () => {
  return (
    <MultiDropdown
      value={[]}
      onChange={() => {}}
      options={[]}
      getTitle={(value: Option[]) => {
        if (value.length) return value.join();
        return 'Filter';
      }}
    />
  );
};
