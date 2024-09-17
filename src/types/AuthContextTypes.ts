export interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  user: User | null;
  userLoading: boolean;
  setUserLoading: (value: boolean) => void;
}

export interface User {
  name: string;
  email: string;
}
