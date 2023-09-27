import classNames from 'classnames';

import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon } from '@components/icons/index';
import { Button, ProductCard, Text } from '@components/index';

import { getProductById } from '@config/services/products';

import { OneProduct } from '@utils/types/ProductTypes';

import productStyles from './Product.module.scss';

export const Product: React.FC = () => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = React.useState<OneProduct | null>(null);

  const fetchProductById = async (id: string) => {
    const fetchedProduct = await getProductById(id);

    setProduct(fetchedProduct);
  };

  React.useEffect(() => {
    if (productId) fetchProductById(productId);
  }, [productId]);

  // `${productStyles.product_content} content_wrapper`

  return (
    <div className={classNames(productStyles.product_content, 'content_wrapper')}>
      <button onClick={() => navigate(-1)} className={productStyles.product_back}>
        <ArrowLeftIcon color="primary" />
        <Text view="p-20" color="primary">
          Назад
        </Text>
      </button>
      {product && Object.keys(product).length && (
        <section className={productStyles.product_details}>
          <img src={product.images[0]} alt="product" />
          <div className={productStyles.product_description}>
            <div className={productStyles.product_primary}>
              <Text tag="h2" view="title">
                {product.title}
              </Text>
              <Text view="p-20" color="secondary">
                {product.description}
              </Text>
            </div>
            <div className={productStyles.product_secondary}>
              <Text view="title">${product.price}</Text>
              <div className={productStyles.product_controls}>
                <Button>
                  <Text view="button">Buy now</Text>
                </Button>
                <Button color="secondary">
                  <Text view="button">Add to Cart</Text>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* TODO: Related Items component */}
      <section className={productStyles.product_related}>
        <Text tag="h3" view="subtitle">
          Related Items
        </Text>
        <ProductCard
          image="https://www.ikea.com/sg/en/images/products/kivik-3-seat-sofa-grann-bomstad-black__0137863_pe296632_s5.jpg?f=s"
          title="KIVIK"
          subtitle="Cuddle up in the comfortable KIVIK sofa. The generous size, low armrests and pocket springs with foam that adapts to the body invites you and your guests to many hours of socialising and relaxation."
          contentSlot="123"
          actionSlot={<Button>Add to Cart</Button>}
        />
      </section>
    </div>
  );
};
