import * as React from 'react';

import ProductsMultiDropdown from './components/ProductsMultiDropdown';
import ProductsSearchInput from './components/ProductsSearchInput/ProductsSearchInput';
import ProductsTitle from './components/ProductsTitle/ProductsTitle';

import 'styles/styles.scss';
import productsStyles from './Products.module.scss';

const Products: React.FC = () => {
  const handleProductsSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div className={`${productsStyles.products_content} content_wrapper`}>
      <ProductsTitle className={productsStyles.products_title} />
      <section className={productsStyles.products_search_controls}>
        <ProductsSearchInput className={productsStyles.products_search} onSearch={handleProductsSearch} />
        <ProductsMultiDropdown />
      </section>
    </div>
  );
};

export default Products;
