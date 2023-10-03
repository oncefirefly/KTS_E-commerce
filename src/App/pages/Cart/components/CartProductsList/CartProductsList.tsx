import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Text } from '@components/index';

import { cartStore } from '@store/instance';

import { CartProductsItem } from '../';

import cartListStyles from './CartProductsList.module.scss';

export const CartProductsList: React.FC = observer(() => {
  return (
    <section className={cartListStyles.cart_list}>
      <div className={cartListStyles.cart_header}>
        <Text className={cartListStyles.cart_header_product} view="p-20" weight="bold">
          Product
        </Text>
        <Text className={cartListStyles.cart_header_quantity} view="p-20" weight="bold">
          Quantity
        </Text>
        <Text className={cartListStyles.cart_header_price} view="p-20" weight="bold">
          Price
        </Text>
      </div>
      {cartStore.cart.products.map((product) => (
        <CartProductsItem key={product.id} product={product} />
      ))}
    </section>
  );
});
