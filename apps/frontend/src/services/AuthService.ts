import api from '../infrastructure/api';
import { tokenPairRepository } from '../infrastructure/repositories';

export default class AuthService {
  login = async (email: string, password: string) => {
    const {
      data: { token },
    } = await api.post('user/login', { email, password });

    if (!token) {
      throw new Error('Отсутвует токен');
    }

    tokenPairRepository.put({
      ACCESS_TOKEN_KEY: token,
      REFRESH_TOKEN_KEY: token,
    });
  };

  refreshToken = async () => {
    try {
      const {
        data: { token },
      } = await api.get('/user/refresh');

      tokenPairRepository.put({
        ACCESS_TOKEN_KEY: token,
        REFRESH_TOKEN_KEY: token,
      });
    } catch (error) {
      tokenPairRepository.clear();
      throw error;
    }
  };

  logout = async () => {
    await api.post('/user/logout', '');
    tokenPairRepository.clear();
  };
}
