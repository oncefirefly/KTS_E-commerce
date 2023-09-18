import { eCommerceInstance } from 'config/services/eCommerceInstance';
import { OneProduct } from 'utils/types/ProductTypes';

export const getProducts = (categoryIds?: string): Promise<OneProduct[]> =>
  eCommerceInstance
    .get(`/products?include=${categoryIds}`)
    .then((productsResponse) => productsResponse.data)
    .catch((error) => {
      throw new Error(error);
    });

export const getProductById = (id: string): Promise<OneProduct> =>
  eCommerceInstance
    .get(`/products/${id}`)
    .then((productByIdData) => productByIdData.data)
    .catch((error) => {
      throw new Error(error);
    });
