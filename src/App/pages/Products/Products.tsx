import * as React from 'react';

import { getProducts } from 'config/services/products';
import { OneProduct } from 'utils/types/ProductTypes';

import { ProductsList, ProductsMultiDropdown, ProductsSearchInput, ProductsTitle } from './components';

import productsStyles from './Products.module.scss';

export const Products: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [products, setProducts] = React.useState<OneProduct[] | []>([]);

  // TODO: search filter
  const handleProductsSearch = (value: string) => {
    return value;
  };

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();

    setProducts(fetchedProducts);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  React.useEffect(() => {}, [currentPage]);

  return (
    <div className={`${productsStyles.products_content} content_wrapper`}>
      <ProductsTitle className={productsStyles.products_title} />
      <section className={productsStyles.products_search_controls}>
        <ProductsSearchInput className={productsStyles.products_search} onSearch={handleProductsSearch} />
        <ProductsMultiDropdown />
      </section>
      <ProductsList
        className={productsStyles.products_list}
        products={products}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
};
