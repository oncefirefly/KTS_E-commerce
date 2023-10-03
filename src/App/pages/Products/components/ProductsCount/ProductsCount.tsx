import * as React from 'react';

import { Text } from '@components/index';

import { ProductsCountProps } from '@utils/types/ProductTypes';

export const ProductsCount: React.FC<ProductsCountProps> = ({ className, count = 0 }) => {
  return (
    <div className={className || ''}>
      <Text tag="h3" view="subtitle">
        Total Products
      </Text>
      <Text view="p-20" weight="bold" color="accent">
        {count}
      </Text>
    </div>
  );
};
