import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import { MultiDropdown } from '@components/index';

import CategoriesStore from '@store/CategoriesStore';
import ProductsStore from '@store/ProductsStore';

import { categoriesToOptions } from '@utils/functions/categoriesToOptions';

import { Option } from '@utils/types/MultiDropdownTypes';

import { ProductsList, ProductsSearchInput, ProductsTitle } from './components';

import productsStyles from './Products.module.scss';

export const Products: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = React.useState<string>('');
  const [selectedCategories, setSelectedCategories] = React.useState<Option[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const productsStore = React.useMemo(() => {
    return new ProductsStore();
  }, []);

  const categoriesStore = React.useMemo(() => {
    return new CategoriesStore();
  }, []);

  // setup products (including categories filter and search)
  React.useMemo(() => {
    const setupProducts = async () => {
      const selectedOptions = selectedCategories.map((option) => option.key).join('|');

      await productsStore.fetchProducts({ categoryIds: selectedOptions });
      await categoriesStore.fetchCategories();

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
    // const selectedCategoriesKeys = selectedCategories.map((category) => category.key).join('|');

    setSearchParams({ page: currentPage.toString(), search: searchValue });
  }, [currentPage, searchValue, selectedCategories, setSearchParams]);

  // TODO: classnames
  return (
    <div className={`${productsStyles.products_content} content_wrapper`}>
      <ProductsTitle className={productsStyles.products_title} />
      <section className={productsStyles.products_search_controls}>
        <ProductsSearchInput className={productsStyles.products_search} onSearch={setSearchValue} />
        <MultiDropdown
          value={selectedCategories}
          onChange={(value: Option[]) => setSelectedCategories(value)}
          options={categoriesToOptions(categoriesStore.categories)}
          getTitle={(value: Option[]) => {
            if (value.length) {
              return value.map((option) => option.value).join(', ');
            }

            return 'Filter';
          }}
        />
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
