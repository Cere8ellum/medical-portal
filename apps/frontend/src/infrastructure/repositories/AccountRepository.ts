import api from '../api';

export interface Account {
  id: number;
  role: string;
}

export default class AccountRepository {
  public get = async (): Promise<Account> => {
    const {
      data: { id, role },
    } = await api.get('/user/');

    return { id, role };
  };
}
