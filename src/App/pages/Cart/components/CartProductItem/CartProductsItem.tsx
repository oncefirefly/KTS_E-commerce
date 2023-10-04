import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Text } from '@components/index';

import { cartStore } from '@store/instance';

import { CartItemProps } from '@utils/types/CartTypes';

import cartItemStyles from './CartProductsItem.module.scss';

export const CartProductsItem: React.FC<CartItemProps> = observer(({ product }) => {
  const navigate = useNavigate();

  return (
    <div className={cartItemStyles.cart_item} onClick={() => navigate(`/product/${product.id}`)}>
      <img className={cartItemStyles.cart_item_thumbnail} src={product.images[0]} />
      <div className={cartItemStyles.cart_item_title}>
        <Text view="p-20" weight="medium">
          {product.title}
        </Text>
        <Text view="p-16" color="secondary" maxLines={2}>
          {product.subtitle}
        </Text>
      </div>
      <div className={cartItemStyles.cart_item_quantity}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            cartStore.substractQuantity(product);
          }}
          disabled={product.quantity === 0}
        >
          -
        </button>
        <Text>{product.quantity}</Text>
        <button
          onClick={(e) => {
            e.stopPropagation();
            cartStore.addQuantity(product);
          }}
        >
          +
        </button>
      </div>
      <Text className={cartItemStyles.cart_item_price} view="p-16" weight="medium" color="accent">
        {product.price * product.quantity} $
      </Text>
    </div>
  );
});
