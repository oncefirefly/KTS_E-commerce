import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Pagination } from '@components/index';

import { pageSize } from '@utils/constants/pageSize';
import { ProductsListProps } from '@utils/types/ProductTypes';

import { ProductsCount } from '../';
import { ProductPageCard } from './components';

import productsListStyles from './ProductsList.module.scss';

export const ProductsList: React.FC<ProductsListProps> = observer(
  ({ className, products, totalProductsCount, currentPage, onPageChange }) => {
    return (
      <section className={className || ''}>
        <ProductsCount className={productsListStyles.products_count} count={totalProductsCount} />
        <div className={productsListStyles.products_list_container}>
          {products.map((product) => (
            <ProductPageCard key={product.id} product={product} />
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
