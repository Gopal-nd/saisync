'use client'
import { AuthHydration } from '@/components/AuthHydration';
// import { AuthHydration } from '@/components/AuthHydration';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
          <AuthHydration />
      {children}
    </QueryClientProvider>
  );
}
