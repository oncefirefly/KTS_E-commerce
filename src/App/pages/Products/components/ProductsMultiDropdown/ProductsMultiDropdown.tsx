import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { MultiDropdown } from 'components/';

import CategoriesStore from 'store/CategoriesStore';
import { categoriesToOptions } from 'utils/functions/categoriesToOptions';

import { Option } from 'utils/types/MultiDropdownTypes';
import { ProductsMultiDropdownProps } from 'utils/types/ProductTypes';

export const ProductsMultiDropdown: React.FC<ProductsMultiDropdownProps> = observer(({ selectedOptions, onChange }) => {
  const categoriesStore = React.useMemo(() => {
    return new CategoriesStore();
  }, []);

  React.useEffect(() => {
    const fetchCategories = async () => {
      await categoriesStore.fetchCategories();
    };

    fetchCategories();
  }, [categoriesStore]);

  return (
    <MultiDropdown
      value={selectedOptions}
      onChange={onChange}
      options={categoriesToOptions(categoriesStore.categories)}
      getTitle={(value: Option[]) => {
        if (value.length) {
          return value.map((option) => option.value).join(', ');
        }

        return 'Filter';
      }}
    />
  );
});
