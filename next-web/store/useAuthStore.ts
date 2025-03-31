import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

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
  role: string | null;
  token: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setToken: (token: string) => void;
  clearToken: () => void;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      role: null,
      token: null,

      setUser: (user) =>
        set(() => ({
          user: { ...user },
          role: user.role,
          isAuthenticated: true,
        })),

      clearUser: () =>
        set(() => ({
          user: null,
          role: null,
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
          role: user.role,
          isAuthenticated: true,
        })),

      logout: () =>
        set(() => ({
          token: null,
          user: null,
          role: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: 'auth-storage', // Key to store in localStorage
      getStorage: () => localStorage, // Persist using localStorage
    } as PersistOptions<AuthState>
  )
);

export default useAuthStore;
