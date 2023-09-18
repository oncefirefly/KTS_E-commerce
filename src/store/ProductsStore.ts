import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getProducts } from 'config/services/products';

import { OneProduct } from 'utils/types/ProductTypes';

type PrivateProductsStoreFields = '_products' | '_filteredProducts';

export default class ProductsStore {
  private _products: OneProduct[] = [];
  private _filteredProducts: OneProduct[] = [];

  constructor() {
    makeObservable<ProductsStore, PrivateProductsStoreFields>(this, {
      _products: observable,
      _filteredProducts: observable,
      fetchProducts: action.bound,
      filterProductsOnSearch: action,
      products: computed,
    });
  }

  get products() {
    return this._filteredProducts;
  }

  async fetchProducts(categoryIds?: string) {
    const productsData = await getProducts(categoryIds || '');

    runInAction(() => {
      this._products = productsData;
      this._filteredProducts = productsData;
    });
  }

  filterProductsOnSearch(value: string) {
    const lowerCaseValue = value.toLocaleLowerCase();

    runInAction(() => {
      this._filteredProducts = this._products.filter((product) =>
        product.title.toLocaleLowerCase().includes(lowerCaseValue),
      );
    });
  }
}
