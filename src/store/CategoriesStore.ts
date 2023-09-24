import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { getCategories } from '@config/services/categories';
import { ProductCategory } from '@utils/types/ProductTypes';

type PrivateCategoriesStoreFields = '_categories';

export default class CategoriesStore {
  private _categories: ProductCategory[] = [];

  constructor() {
    makeObservable<CategoriesStore, PrivateCategoriesStoreFields>(this, {
      _categories: observable,
      fetchCategories: action.bound,
      categories: computed,
    });
  }

  get categories() {
    return this._categories;
  }

  async fetchCategories() {
    const categoriesData = await getCategories();

    runInAction(() => {
      this._categories = categoriesData;
    });
  }
}
