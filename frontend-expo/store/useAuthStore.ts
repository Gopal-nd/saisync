import { create } from 'zustand';

type User = {
  id: string;
  email: string;
  role: string;
  usn?: string;
  name?: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setToken: (token: string) => void;
  clearToken: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
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
      },
      isAuthenticated: true,
    })),

  clearUser: () =>
    set(() => ({
      user: null,
      isAuthenticated: false,
      token: null,
      
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
}));

export default useAuthStore;
