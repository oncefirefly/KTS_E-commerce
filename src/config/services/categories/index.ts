import { eCommerceInstance } from '@config/services/eCommerceInstance';
import { ProductCategory } from '@utils/types/ProductTypes';

export const getCategories = (): Promise<ProductCategory[]> =>
  eCommerceInstance
    .get('/categories')
    .then((categoriesResponse) => categoriesResponse.data)
    .catch((error) => {
      throw new Error(error);
    });
