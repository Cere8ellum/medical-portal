import { makeAutoObservable } from 'mobx';

class UserStore {
  userId = 0;
  role = '';

  constructor() {
    makeAutoObservable(this);
  }
  userIdSet = (value: number) => {
    this.userId = value;
  };
  roleSet = (value: string) => {
    this.role = value;
  };
}

export default UserStore;
