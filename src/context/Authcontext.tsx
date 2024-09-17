import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axiosInstance from "../axiosInstance";
import { AuthContextType, User } from "../types/AuthContextTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!accessToken
  );
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const fetchUserData = async () => {
    setUserLoading(true);
    try {
      const response = await axiosInstance.post<User>("/users/me");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setUserLoading(false);
  };

  useEffect(() => {
    setUserLoading(true);
    if (isAuthenticated) {
      fetchUserData();
    }
    setUserLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    setUserLoading(true);
    // Whenever tokens change, update localStorage and authentication state
    if (accessToken && refreshToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setUserLoading(false);
  }, [accessToken, refreshToken]);

  const setTokens = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Clear the tokens and update authentication state
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setTokens,
        logout,
        isAuthenticated,
        user,
        userLoading,
        setUserLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
