import classNames from 'classnames';

import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon } from '@components/icons/index';
import { Button, Text, ProductCard } from '@components/index';

import { getProductById } from '@config/services/products';

import ProductsStore from '@store/ProductsStore';
import { categoriesStore, cartStore } from '@store/instance';

import { OneProduct } from '@utils/types/ProductTypes';

import productStyles from './Product.module.scss';

export const Product: React.FC = observer(() => {
  const { productId } = useParams();

  const navigate = useNavigate();

  const [cartButtonProperties, setCartButtonProperties] = React.useState<{
    text: string;
    color: 'secondary' | 'primary';
  } | null>(null);

  const categoriesLength = categoriesStore.categories.length;
  const productsStore = React.useMemo(() => {
    return new ProductsStore();
  }, []);

  const [product, setProduct] = React.useState<OneProduct | null>(null);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  React.useMemo(() => {
    const fetchProductById = async (id: string) => {
      const fetchedProduct = await getProductById(id);

      setProduct(fetchedProduct);

      if (!categoriesLength) {
        await categoriesStore.fetchCategories();
      }

      const categoryId = categoriesStore.findCategoryIdByName(fetchedProduct.category);

      await productsStore.fetchProducts({
        categoryIds: categoryId.toString(),
        offset: Math.floor(Math.random() * 5),
        limit: 3,
      });
    };

    if (productId) fetchProductById(productId);
  }, [categoriesLength, productId, productsStore]);

  React.useMemo(() => {
    if (product && Object.keys(product).length) {
      setCartButtonProperties(
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
    }
  }, [product]);

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
              {cartButtonProperties && Object.keys(cartButtonProperties).length && (
                <div className={productStyles.product_controls}>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (cartStore.isInCart(product)) {
                        cartStore.removeFromCart(product);
                        setCartButtonProperties({
                          text: 'Add to Cart',
                          color: 'primary',
                        });
                        return;
                      }
                      cartStore.addToCart(product);
                      setCartButtonProperties({
                        text: 'Remove  from Cart',
                        color: 'secondary',
                      });
                    }}
                    color={cartButtonProperties.color}
                  >
                    <Text view="button">{cartButtonProperties.text}</Text>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      <section className={productStyles.product_related}>
        <Text tag="h3" view="subtitle">
          Related Items
        </Text>
        <div className={productStyles.product_related_list}>
          {productsStore.products.map(({ id, images, category, title, description, price }) => (
            <ProductCard
              key={id}
              image={images[0]}
              captionSlot={category}
              title={title}
              subtitle={description}
              contentSlot={price}
              onClick={() => handleProductClick(id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
});
