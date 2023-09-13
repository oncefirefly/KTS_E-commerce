import * as React from 'react';

import { Text } from 'components/';

import { ProductCardProps } from 'utils/types/ProductTypes';

import cardStyles from './ProductCard.module.scss';

export const ProductCard: React.FC<ProductCardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  ...props
}: ProductCardProps) => {
  return (
    <div className={`${cardStyles.card_container} ${className ? ` ${className}` : ''}`} onClick={onClick} {...props}>
      <div className={cardStyles.card_header}>
        <img src={image} alt="card_thumbnail" />
      </div>
      <div className={cardStyles.card_body}>
        <div className={cardStyles.card_text}>
          {captionSlot && (
            <Text view="p-14" weight="medium" color="secondary">
              {captionSlot}
            </Text>
          )}
          <Text view="p-20" maxLines={1} weight="bold" color="primary" data-testid="text">
            {title}
          </Text>
          <Text view="p-16" maxLines={1} color="secondary" data-testid="text">
            {subtitle}
          </Text>
        </div>
        <div className={cardStyles.card_footer}>
          {contentSlot && (
            <Text view="p-18" weight="bold">
              ${contentSlot}
            </Text>
          )}
          {actionSlot}
        </div>
      </div>
    </div>
  );
};
