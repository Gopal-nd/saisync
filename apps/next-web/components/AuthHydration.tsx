"use client"
import { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import axiosInstance from '@/lib/axiosInstance';
import { isTokenExpired } from '@/lib/tokenUtils';
import { useRouter } from 'next/navigation';

export function AuthHydration() {
  const router = useRouter();

  useEffect(() => {
    const token = useAuthStore.getState().token;

    if (!token || isTokenExpired(token)) {
      useAuthStore.getState().logout();
      router.push('/sign-in');
      return;
    }

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }, []);

  return null;
}