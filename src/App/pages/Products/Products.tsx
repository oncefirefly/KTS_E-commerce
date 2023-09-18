import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductsStore from 'store/ProductsStore';

import { ProductsList, ProductsMultiDropdown, ProductsSearchInput, ProductsTitle } from './components';

import productsStyles from './Products.module.scss';

export const Products: React.FC = observer(() => {
  const pageFromLocalStorage = localStorage.getItem('eCommerceProductsPage');

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = React.useState<number>(pageFromLocalStorage ? +pageFromLocalStorage : 1);

  const productsStore = React.useMemo(() => {
    return new ProductsStore();
  }, []);

  // TODO: search filter
  const handleProductsSearch = (value: string) => {
    productsStore.filterProductsOnSearch(value);
  };

  React.useEffect(() => {
    const fetchProducts = async () => {
      await productsStore.fetchProducts();
    };

    fetchProducts();
  }, [productsStore]);

  React.useEffect(() => {
    const searchParamsData = Object.fromEntries(searchParams.entries());

    if (searchParamsData.page) {
      setCurrentPage(+searchParamsData.page);
    }
  }, [searchParams]);

  React.useEffect(() => {
    localStorage.setItem('eCommerceProductsPage', currentPage.toString());

    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  return (
    <div className={`${productsStyles.products_content} content_wrapper`}>
      <ProductsTitle className={productsStyles.products_title} />
      <section className={productsStyles.products_search_controls}>
        <ProductsSearchInput className={productsStyles.products_search} onSearch={handleProductsSearch} />
        <ProductsMultiDropdown />
      </section>
      <ProductsList
        className={productsStyles.products_list}
        products={productsStore.products}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
});
