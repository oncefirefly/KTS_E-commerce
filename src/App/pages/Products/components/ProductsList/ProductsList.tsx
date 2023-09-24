import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, ProductCard, Pagination } from '@components/index';

import { OneProduct, ProductsListProps } from '@utils/types/ProductTypes';

import { ProductsCount } from '../';

import productsListStyles from './ProductsList.module.scss';

const pageSize = 9;

export const ProductsList: React.FC<ProductsListProps> = observer(
  ({ className, products, currentPage, onPageChange }) => {
    const navigate = useNavigate();

    const renderedProducts: OneProduct[] = React.useMemo(() => {
      const firstPageIndex = (currentPage - 1) * pageSize;
      const lastPageIndex = firstPageIndex + pageSize;
      return products.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, products]);

    return (
      <section className={className || ''}>
        <ProductsCount className={productsListStyles.products_count} count={products.length} />
        <div className={productsListStyles.products_list_container}>
          {renderedProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.images[0]}
              captionSlot={product.category}
              title={product.title}
              subtitle={product.description}
              contentSlot={product.price}
              actionSlot={<Button>Add to Cart</Button>}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalCount={products.length}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </section>
    );
  },
);
