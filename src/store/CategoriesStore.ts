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
      findSelectedCategories: action.bound,
      categories: computed,
    });
  }

  get categories() {
    return this._categories;
  }

  async fetchCategories() {
    if (this._categories.length) {
      return;
    }

    const categoriesData = await getCategories();

    runInAction(() => {
      this._categories = categoriesData;
    });
  }

  findSelectedCategories(selectedIds: number[]) {
    return selectedIds.reduce((selectedOptions, selectedId) => {
      const foundCategory = this.categories.find((category) => category.id === +selectedId);

      if (foundCategory) {
        selectedOptions.push(foundCategory);
      }

      return selectedOptions;
    }, [] as ProductCategory[]);
  }
}
