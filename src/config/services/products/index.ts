import { eCommerceInstance } from 'config/services/eCommerceInstance';
import { OneProduct } from 'utils/types/ProductTypes';

export const getProducts = (): Promise<OneProduct[]> =>
  eCommerceInstance
    .get('/products')
    .then((productsResponse) => productsResponse.data.slice(0, 10))
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
