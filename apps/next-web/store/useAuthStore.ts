import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type User = {
  id: string;
  email: string;
  role: string;
  usn?: string;
  name?: string;
  branch?: string;
  semester?: string;
  section?: string;
  schema?: string;
  image?: string;
  mentor?: string;
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

// ✅ No module-level window access at all
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      role: null,
      token: null,

      setUser: (user) =>
        set({ user: { ...user }, role: user.role, isAuthenticated: true }),

      clearUser: () =>
        set({ user: null, role: null, isAuthenticated: false }),

      setToken: (token) =>
        set({ token, isAuthenticated: true }),

      clearToken: () =>
        set({ token: null, isAuthenticated: false }),

      setAuth: (token, user) =>
        set({ token, user: { ...user }, role: user.role, isAuthenticated: true }),

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth-storage');
        }
        set({ token: null, user: null, role: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      // ✅ The function is only CALLED in the browser, never on the server
      storage: createJSONStorage(() => {
        if (typeof window === 'undefined') {
          // SSR: return a no-op storage so Zustand doesn't crash
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        return window.localStorage;
      }),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;