import classNames from 'classnames';

import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon } from '@components/icons/index';
import { Button, Text, ProductCard } from '@components/index';

import { getProductById } from '@config/services/products';

import ProductsStore from '@store/ProductsStore';
import categoriesStore from '@store/instance';

import { OneProduct } from '@utils/types/ProductTypes';

import productStyles from './Product.module.scss';

export const Product: React.FC = observer(() => {
  const { productId } = useParams();

  const navigate = useNavigate();

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
        offset: Math.floor(Math.random() * 3),
        limit: 3,
      });
    };

    if (productId) fetchProductById(productId);
  }, [categoriesLength, productId, productsStore]);

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
