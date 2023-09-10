import { makeAutoObservable } from 'mobx';

class UserStore {
  userId = 0;

  constructor() {
    makeAutoObservable(this);
  }
  userIdSet = (value: number) => {
    this.userId = value;
  };
}

export default UserStore;
