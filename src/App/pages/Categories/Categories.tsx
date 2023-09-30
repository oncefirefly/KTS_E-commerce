import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { LoadingSpinner, PageTitle, PopupWrapper } from '@components/index';

import CategoriesStore from '@store/CategoriesStore';

import { CategoriesList } from './components/CategoriesList/CategoriesList';

import categoriesStyles from './Categories.module.scss';

export const Categories: React.FC = observer(() => {
  const [loading, setIsLoading] = React.useState(false);

  const categoriesStore = React.useMemo(() => {
    return new CategoriesStore();
  }, []);

  const categoriesLength = categoriesStore.categories.length;

  React.useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      await categoriesStore.fetchCategories();
      setIsLoading(false);
    };

    if (!categoriesLength) {
      fetchCategories();
    }
  }, [categoriesLength, categoriesStore]);

  return (
    <div className={classNames(categoriesStyles.categories_content, 'content_wrapper')}>
      <PageTitle
        className={categoriesStyles.categories_title}
        title="Categories"
        subTitle="Here is the list of current product categories"
      />
      <CategoriesList className={categoriesStyles.categories_list} categories={categoriesStore.categories} />
      {loading && (
        <PopupWrapper>
          <LoadingSpinner />
        </PopupWrapper>
      )}
    </div>
  );
});
