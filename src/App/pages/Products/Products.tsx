import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductsStore from 'store/ProductsStore';

import { Option } from 'utils/types/MultiDropdownTypes';

import { ProductsList, ProductsMultiDropdown, ProductsSearchInput, ProductsTitle } from './components';

import productsStyles from './Products.module.scss';

let renderCount = 0;

export const Products: React.FC = observer(() => {
  console.log('render', ++renderCount);

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

  const handleProductsSearch = React.useCallback(
    (value: string) => {
      productsStore.filterProductsOnSearch(value);

      setSearchValue(value);
      setCurrentPage(1);
    },
    [productsStore],
  );

  const handleCategoryFilter = React.useCallback(
    (value: Option[]) => {
      setSelectedCategories(value);
      const selectedOptions = value.map((option) => option.key).join('|');

      productsStore.fetchProducts(selectedOptions);
    },
    [productsStore],
  );

  React.useEffect(() => {
    const setupProducts = async () => {
      console.log('fetching...');

      await productsStore.fetchProducts();
    };

    setupProducts();
  }, [productsStore]);

  React.useEffect(() => {
    const selectedCategoriesKeys = selectedCategories.map((category) => category.key).join('|');

    localStorage.setItem('eCommerceProductsPage', currentPage.toString());
    localStorage.setItem('eCommerceProductsSearch', searchValue);
    localStorage.setItem('eCommerceProductsCategories', JSON.stringify(selectedCategories));

    setSearchParams({ page: currentPage.toString(), search: searchValue, categories: selectedCategoriesKeys });
  }, [currentPage, searchValue, selectedCategories, setSearchParams]);

  React.useEffect(() => {
    const searchParamsData = Object.fromEntries(searchParams.entries());

    setCurrentPage(+searchParamsData.page);

    setSearchValue(searchParamsData.search);
  }, [searchParams]);

  return (
    <div className={`${productsStyles.products_content} content_wrapper`}>
      <ProductsTitle className={productsStyles.products_title} />
      <section className={productsStyles.products_search_controls}>
        <ProductsSearchInput className={productsStyles.products_search} onSearch={handleProductsSearch} />
        <ProductsMultiDropdown selectedOptions={selectedCategories} onChange={handleCategoryFilter} />
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
