import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductsStore from 'store/ProductsStore';

import { Option } from 'utils/types/MultiDropdownTypes';

import { ProductsList, ProductsMultiDropdown, ProductsSearchInput, ProductsTitle } from './components';

import productsStyles from './Products.module.scss';

export const Products: React.FC = observer(() => {
  const pageFromLocalStorage = localStorage.getItem('eCommerceProductsPage');
  const searchValueFromLocalStorage = localStorage.getItem('eCommerceProductsSearch');
  const categoriesFromLocalStorage = JSON.parse(localStorage.getItem('eCommerceProductsCategories') as string);

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = React.useState<string>(searchValueFromLocalStorage || '');
  const [selectedCategories, setSelectedCategories] = React.useState<Option[]>(categoriesFromLocalStorage || []);
  const [currentPage, setCurrentPage] = React.useState<number>(pageFromLocalStorage ? +pageFromLocalStorage : 1);

  const productsStore = React.useMemo(() => {
    return new ProductsStore();
  }, []);

  // setup products (including categories filter and search)
  React.useMemo(() => {
    const setupProducts = async () => {
      const selectedOptions = selectedCategories.map((option) => option.key).join('|');

      await productsStore.fetchProducts(selectedOptions);

      if (searchValue.length) {
        productsStore.filterProductsOnSearch(searchValue);
      }
    };

    setupProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsStore, selectedCategories]);

  // updating states on searchParams change
  React.useMemo(() => {
    const searchParamsData = Object.fromEntries(searchParams.entries());

    if (searchParamsData.page) setCurrentPage(+searchParamsData.page);

    if (searchParamsData.search) setSearchValue(searchParamsData.search);
  }, [searchParams]);

  // filter products on searchValue change
  React.useEffect(() => {
    productsStore.filterProductsOnSearch(searchValue);
  }, [productsStore, searchValue]);

  // saving searchParams to Local Storage and updating existing searchParams
  React.useEffect(() => {
    const selectedCategoriesKeys = selectedCategories.map((category) => category.key).join('|');

    localStorage.setItem('eCommerceProductsPage', currentPage.toString());
    localStorage.setItem('eCommerceProductsSearch', searchValue);
    localStorage.setItem('eCommerceProductsCategories', JSON.stringify(selectedCategories));

    setSearchParams({ page: currentPage.toString(), search: searchValue, categories: selectedCategoriesKeys });
  }, [currentPage, searchValue, selectedCategories, setSearchParams]);

  // TODO: classnames
  return (
    <div className={`${productsStyles.products_content} content_wrapper`}>
      <ProductsTitle className={productsStyles.products_title} />
      <section className={productsStyles.products_search_controls}>
        <ProductsSearchInput className={productsStyles.products_search} onSearch={setSearchValue} />
        <ProductsMultiDropdown selectedOptions={selectedCategories} onChange={setSelectedCategories} />
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
