import { create } from 'zustand';

type User = {
  id: string;
  email: string;
  role: string;
  usn?: string;
  name?: string;
  branch?: string;
  semester?: string;
  section?: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setToken: (token: string) => void;
  clearToken: () => void;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,

  setUser: (user) =>
    set(() => ({
      user: { ...user },
      isAuthenticated: true,
    })),

  clearUser: () =>
    set(() => ({
      user: null,
      isAuthenticated: false,
    })),

  setToken: (token) =>
    set(() => ({
      token,
      isAuthenticated: true,
    })),

  clearToken: () =>
    set(() => ({
      token: null,
      isAuthenticated: false,
    })),

  setAuth: (token, user) =>
    set(() => ({
      token,
      user: { ...user },
      isAuthenticated: true,
    })),

  logout: () =>
    set(() => ({
      token: null,
      user: null,
      isAuthenticated: false,
    })),
}));

export default useAuthStore;