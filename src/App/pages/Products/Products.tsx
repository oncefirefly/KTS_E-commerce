import classNames from 'classnames';

import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

import { MultiDropdown, LoadingSpinner, PopupWrapper, PageTitle } from '@components/index';

import ProductsStore from '@store/ProductsStore';
import { categoriesStore } from '@store/instance';

import { pageSize } from '@utils/constants/pageSize';
import { categoriesToOptions } from '@utils/functions/categoriesToOptions';
import { paramsFromEntries } from '@utils/functions/paramsFromEntries';
import { useOverflow } from '@utils/hooks/useOverflow';
import { Option } from '@utils/types/MultiDropdownTypes';

import { ProductsList, ProductsSearchInput } from './components';

import productsStyles from './Products.module.scss';

export const Products: React.FC = observer(() => {
  const [loading, setIsLoading] = React.useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    search: '',
    categories: '',
  });

  const productsStore = React.useMemo(() => {
    return new ProductsStore();
  }, []);

  const categoriesLength = categoriesStore.categories.length;

  useOverflow(loading);

  React.useMemo(() => {
    const fetchProducts = async () => {
      const searchParamsData = paramsFromEntries(searchParams);
      setIsLoading(true);

      await productsStore.fetchProducts({
        categoryIds: searchParamsData.categories || '',
        searchValue: searchParamsData.search,
        offset: (+searchParamsData.page - 1) * pageSize,
        limit: pageSize,
      });

      if (!categoriesLength) {
        await categoriesStore.fetchCategories();
      }

      setIsLoading(false);
    };

    fetchProducts();
  }, [categoriesLength, productsStore, searchParams]);

  return (
    <div className={classNames(productsStyles.products_content, 'content_wrapper')}>
      <PageTitle
        className={productsStyles.products_title}
        title="Products"
        subTitle="We&nbsp;display products based on&nbsp;the latest products we&nbsp;have, if&nbsp;you want to&nbsp;see our old
          products please enter the name of&nbsp;the item"
      />
      <section className={productsStyles.products_search_controls}>
        <ProductsSearchInput
          className={productsStyles.products_search}
          onSearch={(value) => {
            setSearchParams((prevParams) => ({
              ...paramsFromEntries(prevParams),
              search: value,
              page: '1',
            }));
          }}
        />
        <MultiDropdown
          id="productsFilter"
          value={categoriesToOptions(
            categoriesStore.findSelectedCategories(
              paramsFromEntries(searchParams)
                .categories.split('|')
                .map((categoryId) => +categoryId),
            ),
          )}
          onChange={(value: Option[]) => {
            setSearchParams((prevParams) => ({
              ...paramsFromEntries(prevParams),
              categories: value.map((option) => option.key).join('|'),
              page: '1',
            }));
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
        currentPage={+paramsFromEntries(searchParams).page}
        onPageChange={(page: number) =>
          setSearchParams((prevParams) => ({
            ...paramsFromEntries(prevParams),
            page: page.toString(),
          }))
        }
      />
      {loading && (
        <PopupWrapper>
          <LoadingSpinner />
        </PopupWrapper>
      )}
    </div>
  );
});
