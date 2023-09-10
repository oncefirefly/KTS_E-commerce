import { eCommerceInstance } from 'config/services/eCommerceInstance';

export const getProducts = () =>
  eCommerceInstance
    .get('/products')
    .then((productsResponse) => productsResponse.data.slice(0, 10))
    .catch((error) => {
      throw new Error(error);
    });
