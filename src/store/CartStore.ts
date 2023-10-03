import { action, autorun, computed, makeObservable, observable, runInAction } from 'mobx';
import { userDataStore } from '@store/instance';
import { Cart, CartProduct } from '@utils/types/CartTypes';
import { OneProduct } from '@utils/types/ProductTypes';

type PrivateCartStoreFields = '_cart';

// TODO: Clear Cart
export default class CartStore {
  private _localStorageCartJSON = localStorage.getItem(`cart${userDataStore.userData.uid}`);
  private _cartSkeleton = this._localStorageCartJSON ? JSON.parse(this._localStorageCartJSON) : null;

  private _cart: Cart = this._cartSkeleton || {
    uid: 'Guest',
    products: [],
  };

  constructor() {
    autorun(() => {
      this.updateCartUID(userDataStore.userData.uid);
    });

    makeObservable<CartStore, PrivateCartStoreFields>(this, {
      _cart: observable,
      cart: computed,
      totalPrice: computed,
      isInCart: action.bound,
      addToCart: action.bound,
      removeFromCart: action.bound,
      addQuantity: action.bound,
      substractQuantity: action.bound,
    });
  }

  get cart() {
    return this._cart;
  }

  get totalPrice() {
    return this._cart.products.reduce((total, product) => (total += product.price * product.quantity), 0);
  }

  private updateCartUID(uid: string) {
    const cartFromLocalStorage = localStorage.getItem(`cart${uid}`);
    const cartSkeleton = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : null;

    this._cart = cartSkeleton || {
      uid,
      products: [],
    };
  }

  isInCart(product: OneProduct) {
    return this._cart.products.filter((item) => item.id === product.id).length;
  }

  addToCart(product: OneProduct) {
    if (this.isInCart(product)) {
      this.addQuantity(product as CartProduct);

      return;
    }

    runInAction(() => {
      this._cart.products.push({
        ...product,
        quantity: 1,
      });

      localStorage.setItem(`cart${this._cart.uid}`, JSON.stringify(this._cart));
    });
  }

  removeFromCart(product: OneProduct) {
    const productToRemoveIndex = this._cart.products.findIndex((cartItem) => cartItem.id === product.id);

    runInAction(() => {
      this._cart.products.splice(productToRemoveIndex, 1);

      localStorage.setItem(`cart${this._cart.uid}`, JSON.stringify(this._cart));
    });
  }

  addQuantity(product: CartProduct) {
    runInAction(() => {
      this._cart.products.forEach((item) => {
        if (item.id === product.id) {
          ++item.quantity;
        }
      });

      localStorage.setItem(`cart${this._cart.uid}`, JSON.stringify(this._cart));
    });
  }

  substractQuantity(product: CartProduct) {
    runInAction(() => {
      this._cart.products.forEach((item) => {
        if (item.id === product.id) {
          if (item.quantity === 1) {
            this.removeFromCart(item);
            return;
          }

          --item.quantity;
        }
      });

      localStorage.setItem(`cart${this._cart.uid}`, JSON.stringify(this._cart));
    });
  }
}
