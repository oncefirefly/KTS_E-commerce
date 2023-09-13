import * as React from 'react';

import Text from 'components/Text';

import { ProductsCountProps } from 'utils/types/ProductTypes';

const ProductsCount: React.FC<ProductsCountProps> = ({ className, count = 0 }) => {
  return (
    <section className={className || ''}>
      <Text tag="h3" view="subtitle">
        Total Products
      </Text>
      <Text view="p-20" weight="bold" color="accent">
        {count}
      </Text>
    </section>
  );
};

export default ProductsCount;
