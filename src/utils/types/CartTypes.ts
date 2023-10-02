import { OneProduct } from './ProductTypes';

export interface CartProduct extends OneProduct {
  quantity: number;
}

export type CartItemProps = {
  product: CartProduct;
};

export type Cart = {
  uid: string;
  products: CartProduct[];
};
