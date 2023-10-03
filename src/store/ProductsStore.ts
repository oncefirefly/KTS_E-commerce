import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getProducts } from '@config/services/products';

import { OneProduct } from '@utils/types/ProductTypes';

type PrivateProductsStoreFields = '_products' | '_totalProductsCount';

export default class ProductsStore {
  private _totalProductsCount: number = 0;
  private _products: OneProduct[] = [];

  constructor() {
    makeObservable<ProductsStore, PrivateProductsStoreFields>(this, {
      _totalProductsCount: observable,
      _products: observable,
      fetchProducts: action.bound,
      products: computed,
      total: computed,
    });
  }

  get products() {
    return this._products;
  }

  get total() {
    return this._totalProductsCount;
  }

  async fetchProducts({ categoryIds = '', searchValue = '', offset = 0, limit = Infinity }) {
    const productsData = await getProducts({ categoryIds, searchValue, offset, limit });

    runInAction(() => {
      this._totalProductsCount = productsData.total;
      this._products = productsData.products;
    });
  }
}
