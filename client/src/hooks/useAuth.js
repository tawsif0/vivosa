import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext(null);
const STORAGE_KEYS = {
  user: "user",
  token: "token",
  activeTab: "dashboardActiveTab",
  registrationClosed: "vivosa.registrationClosed",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const storedToken = localStorage.getItem(STORAGE_KEYS.token);
        if (storedToken) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${storedToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response?.status === 401 &&
          !String(error.config?.url || "").includes("/auth/login") &&
          !String(error.config?.url || "").includes("/auth/register")
        ) {
          localStorage.removeItem(STORAGE_KEYS.user);
          localStorage.removeItem(STORAGE_KEYS.token);
          setUser(null);
          setToken(null);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.user);
      const storedToken = localStorage.getItem(STORAGE_KEYS.token);

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    } catch (error) {
      localStorage.removeItem(STORAGE_KEYS.user);
      localStorage.removeItem(STORAGE_KEYS.token);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback((userData, authToken) => {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData));
    localStorage.setItem(STORAGE_KEYS.token, authToken);
    setUser(userData);
    setToken(authToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.activeTab);
    setUser(null);
    setToken(null);
    toast.success("Successfully logged out");
  }, []);

  const updateUser = useCallback((updatedUser) => {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      updateUser,
      isLoading,
      isAuthenticated: Boolean(user && token),
      isAdmin: user?.userType === "admin",
    }),
    [isLoading, login, logout, token, updateUser, user],
  );

  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
