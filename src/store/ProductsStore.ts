import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getProducts } from 'config/services/products';
import { OneProduct } from 'utils/types/ProductTypes';

type PrivateProductsStoreFields = '_products';

export default class ProductsStore {
  private _products: OneProduct[] = [];

  constructor() {
    makeObservable<ProductsStore, PrivateProductsStoreFields>(this, {
      _products: observable,
      fetchProducts: action.bound,
      products: computed,
    });
  }

  get products() {
    return this._products;
  }

  async fetchProducts() {
    const productsData = await getProducts();

    runInAction(() => {
      this._products = productsData;
    });
  }
}
