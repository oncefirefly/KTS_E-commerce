import { eCommerceInstance } from '@config/services/eCommerceInstance';
import { OneProduct } from '@utils/types/ProductTypes';

export const getProducts = ({
  categoryIds = '',
  searchValue = '',
  offset = 0,
  limit = Infinity,
}): Promise<OneProduct[]> =>
  eCommerceInstance
    .get(`/products?include=${categoryIds}&substring=${searchValue}&offset=${offset}&limit=${limit}`)
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
