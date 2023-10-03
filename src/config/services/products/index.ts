import { eCommerceInstance } from '@config/services/eCommerceInstance';
import { OneProduct } from '@utils/types/ProductTypes';

export const getProducts = ({
  categoryIds = '',
  searchValue = '',
  offset = 0,
  limit = Infinity,
}): Promise<{ products: OneProduct[]; total: number }> =>
  eCommerceInstance
    .get<{ products: OneProduct[]; total: number }>(
      `/v2/products?include=${categoryIds}&substring=${searchValue}&offset=${offset}&limit=${limit}`,
    )
    .then((productsResponse) => {
      const { products, total } = productsResponse.data;

      return {
        products,
        total,
      };
    })
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
