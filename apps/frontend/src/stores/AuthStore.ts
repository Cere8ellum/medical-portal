/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { makeAutoObservable, runInAction } from 'mobx';
import { AxiosError, AxiosResponse } from 'axios';
import api from '../infrastructure/api';
import { Account } from './../infrastructure/repositories/AccountRepository';
import {
  tokenPairRepository,
  accountRepository,
} from '../infrastructure/repositories';
import { authService } from '../services';

export default class AuthStore {
  public isAuthorized = false;
  private token?: string | null;
  private account?: Account | null;
  public authorizedUserLoaded = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.bindTokensHandlingToHttpClient();
    (async () => this.initialAuthorizationDefinition())();
  }

  private bindTokensHandlingToHttpClient = (): void => {
    api.interceptors.request.use((config) => {
      const refreshToken = tokenPairRepository.getRefreshToken();

      if (refreshToken) {
        config!.headers!.Authorization = `Bearer ${refreshToken}`;
      }

      return config;
    });

    api.interceptors.response.use(
      (response) => response,
      (error): Promise<AxiosResponse> => {
        if (error.response?.status === 401) {
          return this.refreshTokenAndReattemptRequest(error);
        }

        throw error;
      }
    );
  };

  public refreshTokenAndReattemptRequest = async (
    error: AxiosError
  ): Promise<AxiosResponse> => {
    if (!error.response) {
      throw error;
    }

    try {
      await this.refreshToken();
    } catch (e) {
      this.unAuthorizeUser();
      throw error;
    }

    const refreshToken = tokenPairRepository.getAccessToken();

    return api({
      ...error.response.config,
      headers: {
        ...error.response.config.headers,
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  };

  public refreshToken = () => {
    const refreshToken = tokenPairRepository.getRefreshToken();

    if (!refreshToken) {
      throw new Error('Refresh token is not set.');
    }
  };

  private initialAuthorizationDefinition = async (): Promise<void> => {
    const refreshToken = tokenPairRepository.getRefreshToken();

    if (refreshToken) {
      await this.authorizeUser(refreshToken);
    }
  };

  public authorizeUser = async (token: string): Promise<void> => {
    this.token = token;
    this.isAuthorized = true;
    this.account = await accountRepository.get();

    runInAction((): void => {
      this.authorizedUserLoaded = true;
    });
  };

  public unAuthorizeUser = (): void => {
    this.token = null;
    this.isAuthorized = false;
    this.account = null;
    this.authorizedUserLoaded = false;
  };

  public login = async (login: string, password: string): Promise<void> => {
    if (!login || !password) {
      throw new Error('Вам нужно заполнить электронную почту и пароль');
    }

    await authService.login(login, password);

    const refreshToken = tokenPairRepository.getRefreshToken();

    if (refreshToken) {
      await this.authorizeUser(refreshToken);
    }
  };

  public logout = async (): Promise<void> => {
    try {
      await authService.logout();
      this.unAuthorizeUser();
    } catch (error) {
      console.log('error');
    }
  };

  public get userIsAuthorized(): boolean {
    return this.isAuthorized && this.authorizedUserLoaded;
  }

  public get currentAccount(): Account {
    if (!this.userIsAuthorized) {
      throw new Error('Account is not loaded.');
    }

    return this.account!;
  }
}
