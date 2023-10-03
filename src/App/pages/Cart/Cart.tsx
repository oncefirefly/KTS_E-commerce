import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { PageTitle, Text } from '@components/index';

import { cartStore } from '@store/instance';

import { CartProductsList } from './components';

import cartStyles from './Cart.module.scss';

export const Cart: React.FC = observer(() => {
  return (
    <div className={classNames(cartStyles.cart, 'content_wrapper')}>
      <div className={cartStyles.cart_title}>
        <PageTitle title="Cart" />
        <div className={cartStyles.cart_total}>
          <Text view="p-20" weight="medium">
            Total:
          </Text>
          <Text view="p-20" weight="medium" color="accent">
            {cartStore.totalPrice} $
          </Text>
        </div>
      </div>
      <CartProductsList />
    </div>
  );
});
