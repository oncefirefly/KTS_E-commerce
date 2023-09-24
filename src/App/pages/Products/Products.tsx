import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import { MultiDropdown } from '@components/index';

import CategoriesStore from '@store/CategoriesStore';
import ProductsStore from '@store/ProductsStore';

import { pageSize } from '@utils/constants/pageSize';
import { categoriesToOptions } from '@utils/functions/categoriesToOptions';
import { useSetSearchParams } from '@utils/hooks/useSetParams';

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

  useSetSearchParams('categories', selectedCategories, setSearchParams);
  useSetSearchParams('search', searchValue, setSearchParams);
  useSetSearchParams('page', currentPage.toString(), setSearchParams);

  React.useMemo(() => {
    const fetchProducts = async () => {
      const searchParamsData = Object.fromEntries(searchParams.entries());

      await productsStore.fetchProducts({
        categoryIds: searchParamsData.categories || '',
        searchValue: searchParamsData.search,
        offset: (+searchParamsData.page - 1) * pageSize,
        limit: pageSize,
      });
      await categoriesStore.fetchCategories();

      if (searchParamsData.categories) {
        const selectedCategoryIds = searchParamsData.categories.split('|').map((id) => +id);
        const selectedCategoriesFromIds = categoriesStore.findSelectedCategories(selectedCategoryIds);
        const categories = categoriesToOptions(selectedCategoriesFromIds);

        setSelectedCategories(categories);
      }

      if (searchParamsData.page) setCurrentPage(+searchParamsData.page);

      if (searchParamsData.search) setSearchValue(searchParamsData.search);
    };

    fetchProducts();
  }, [categoriesStore, productsStore, searchParams]);

  // TODO: classnames
  return (
    <div className={`${productsStyles.products_content} content_wrapper`}>
      <ProductsTitle className={productsStyles.products_title} />
      <section className={productsStyles.products_search_controls}>
        <ProductsSearchInput
          className={productsStyles.products_search}
          onSearch={(value) => {
            setSearchValue(value);
            setCurrentPage(1);
          }}
        />
        <MultiDropdown
          value={selectedCategories}
          onChange={(value: Option[]) => {
            setSelectedCategories(value);
            setCurrentPage(1);
          }}
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
        totalProductsCount={productsStore.total}
        currentPage={currentPage}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
    </div>
  );
});
