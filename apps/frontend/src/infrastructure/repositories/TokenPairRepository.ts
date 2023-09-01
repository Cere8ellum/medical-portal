const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

interface TokenPair {
  ACCESS_TOKEN_KEY: string;
  REFRESH_TOKEN_KEY: string;
}

export default class TokenPairRepository {
  public put = (tokenPair: TokenPair): void => {
    this.addRefreshToken(tokenPair.REFRESH_TOKEN_KEY);
  };

  public clear = (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  public getAccessToken = (): string | null =>
    localStorage.getItem(ACCESS_TOKEN_KEY);

  public getRefreshToken = (): string | null =>
    localStorage.getItem(REFRESH_TOKEN_KEY);

  private addAccessToken = (accessToken: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  };

  private addRefreshToken = (refreshToken: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  };
}
