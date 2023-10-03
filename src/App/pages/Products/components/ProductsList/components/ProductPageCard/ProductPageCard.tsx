import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ProductCard, Text } from '@components/index';

import { cartStore } from '@store/instance';

import { ProductPageCardProps } from '@utils/types/ProductTypes';

export const ProductPageCard: React.FC<ProductPageCardProps> = observer(({ product }) => {
  const navigate = useNavigate();

  const [actionSlotProperties, setActionSlotProperties] = React.useState(
    cartStore.isInCart(product)
      ? {
          text: 'Remove from Cart',
          color: 'secondary' as 'primary' | 'secondary',
        }
      : {
          text: 'Add to Cart',
          color: 'primary' as 'primary' | 'secondary',
        },
  );

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <ProductCard
      key={product.id}
      image={product.images[0]}
      captionSlot={product.category}
      title={product.title}
      subtitle={product.description}
      contentSlot={product.price}
      actionSlot={
        <Button
          onClick={(e) => {
            e.stopPropagation();

            if (cartStore.isInCart(product)) {
              cartStore.removeFromCart(product);
              setActionSlotProperties({
                text: 'Add to Cart',
                color: 'primary',
              });

              return;
            }

            cartStore.addToCart(product);
            setActionSlotProperties({
              text: 'Remove  from Cart',
              color: 'secondary',
            });
          }}
          color={actionSlotProperties.color}
        >
          <Text view="p-18">{actionSlotProperties.text}</Text>
        </Button>
      }
      onClick={() => handleProductClick(product.id)}
    />
  );
});
