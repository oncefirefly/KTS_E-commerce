import * as React from 'react';

import Text from 'components/Text';

import { ProductTitleProps } from 'utils/types/ProductsTitleTypes';

const ProductsTitle: React.FC<ProductTitleProps> = (props) => {
  return (
    <section className={props.className || ''}>
      <Text tag="h1" view="title" color="primary" maxLines={1}>
        Products
      </Text>
      <Text view="p-20" color="secondary" maxLines={2}>
        We&nbsp;display products based on&nbsp;the latest products we&nbsp;have, if&nbsp;you want to&nbsp;see our old
        products please enter the name of&nbsp;the item
      </Text>
    </section>
  );
};

export default ProductsTitle;
