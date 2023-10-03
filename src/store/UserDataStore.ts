import { signInWithEmailAndPassword } from 'firebase/auth';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

import { User } from '@utils/types/UserTypes';
import { auth } from '../firebase';

type PrivateUserDataStoreFields = '_userData';

export default class UserDataStore {
  private _userData: User = {
    email: '',
    uid: 'guest',
    displayName: '',
  };

  constructor() {
    makeObservable<UserDataStore, PrivateUserDataStoreFields>(this, {
      _userData: observable,
      login: action,
      logout: action,
      userData: computed,
    });
  }

  get userData() {
    return this._userData;
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;

      runInAction(() => {
        this._userData = {
          uid: user.uid,
          email: user.email!,
          displayName: user.email?.split('@')[0],
        };
      });
    } catch (error) {
      let message = 'Unknown Error';

      if (error instanceof Error) {
        message = error.message;
      }

      throw new Error(message);
    }
  }

  logout() {
    runInAction(() => {
      this._userData = {
        email: '',
        uid: 'guest',
        displayName: '',
      };
    });
  }
}
