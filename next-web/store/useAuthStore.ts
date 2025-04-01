import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

export type User = {
  id: string;
  email: string;
  role: string;
  usn?: string;
  name?: string;
  branch?: string;
  semester?: string;
  section?: string;
  schema?:string;
  image?:string;
};

export type AuthState = {
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

      logout: () => {
        localStorage.removeItem('auth-storage'); 
        set(() => ({
          token: null,
          user: null,
          role: null,
          isAuthenticated: false,
        }));
      },
    }),
    {
      name: 'auth-storage', 
      getStorage: () => localStorage, 
    } as PersistOptions<AuthState>
  )
);

export default useAuthStore;