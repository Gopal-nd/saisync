import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Using persist middleware to save auth state in localStorage
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      setUser: (user) =>
        set(() => ({
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            usn: user.usn,
            name: user.name,
            branch: user.branch,
            semester: user.semester,
            section: user.section,
          },
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

      // Convenience method to set both token and user at once
      setAuth: (token, user) =>
        set(() => ({
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role,
            usn: user.usn,
            name: user.name,
            branch: user.branch,
            semester: user.semester,
            section: user.section,
          },
          isAuthenticated: true,
        })),

      // Convenience method to clear everything at once
      logout: () =>
        set(() => ({
          token: null,
          user: null,
          isAuthenticated: false,
        })),
    }),
    {
      name: 'auth-storage', // name for the localStorage key
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      }), // only persist these fields
    }
  )
);

export default useAuthStore;