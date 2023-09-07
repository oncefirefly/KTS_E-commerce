import * as React from 'react';

import MultiDropdown from 'components/MultiDropdown';

import { Option } from 'utils/types/MultiDropdownTypes';
import { ProductsMultiDropdownProps } from 'utils/types/ProductsMultidropdown';

const ProductsMultiDropdown: React.FC<ProductsMultiDropdownProps> = () => {
  return <MultiDropdown value={[]} onChange={() => {}} options={[]} getTitle={(value: Option[]) => value.join()} />;
};

export default ProductsMultiDropdown;
