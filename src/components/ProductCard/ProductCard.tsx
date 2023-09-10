import * as React from 'react';

import Text from 'components/Text';

import { ProductCardProps } from 'utils/types/ProductTypes';

import cardStyles from './ProductCard.module.scss';

const ProductCard: React.FC<ProductCardProps> = ({
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
  const [cardIsHovered, setCardIsHovered] = React.useState(false);

  return (
    <div
      className={`${cardStyles.card_container} ${className ? ` ${className}` : ''}${
        cardIsHovered ? ` ${cardStyles.hovered}` : ''
      }`}
      onClick={onClick}
      onMouseOver={() => setCardIsHovered(true)}
      onMouseOut={() => setCardIsHovered(false)}
      {...props}
    >
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
          <Text view="p-20" maxLines={1} weight="medium" color="primary" data-testid="text">
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

export default ProductCard;
