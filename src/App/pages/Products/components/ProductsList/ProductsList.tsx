import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ProductCard, Pagination } from '@components/index';

import { pageSize } from '@utils/constants/pageSize';
import { ProductsListProps } from '@utils/types/ProductTypes';

import { ProductsCount } from '../';

import productsListStyles from './ProductsList.module.scss';

export const ProductsList: React.FC<ProductsListProps> = observer(
  ({ className, products, totalProductsCount, currentPage, onPageChange }) => {
    const navigate = useNavigate();

    const handleProductClick = (productId: number) => {
      navigate(`/product/${productId}`);
    };

    return (
      <section className={className || ''}>
        <ProductsCount className={productsListStyles.products_count} count={totalProductsCount} />
        <div className={productsListStyles.products_list_container}>
          {products.map(({ id, images, category, title, description, price }) => (
            <ProductCard
              key={id}
              image={images[0]}
              captionSlot={category}
              title={title}
              subtitle={description}
              contentSlot={price}
              actionSlot={<Button>Add to Cart</Button>}
              onClick={() => handleProductClick(id)}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalCount={totalProductsCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </section>
    );
  },
);
