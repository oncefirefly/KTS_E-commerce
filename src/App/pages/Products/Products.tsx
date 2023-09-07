import * as React from 'react';

import Text from 'components/Text';

import 'styles/styles.scss';
import productsStyles from './Products.module.scss';

const Products: React.FC = () => {
  return (
    <div className={`${productsStyles.products_content} content_wrapper`}>
      <section className={productsStyles.products_title}>
        <Text tag="h1" view="title" color="primary" maxLines={1}>
          Products
        </Text>
        <Text view="p-20" color="secondary" maxLines={2}>
          We&nbsp;display products based on&nbsp;the latest products we&nbsp;have, if&nbsp;you want to&nbsp;see our old
          products please enter the name of&nbsp;the item
        </Text>
      </section>
    </div>
  );
};

export default Products;
