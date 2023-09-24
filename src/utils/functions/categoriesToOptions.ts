import { Option } from '@utils/types/MultiDropdownTypes';
import { ProductCategory } from '@utils/types/ProductTypes';

export const categoriesToOptions = (categories: ProductCategory[]): Option[] => {
  return categories.map((category) => ({ key: category.id, value: category.name }) as unknown as Option);
};
