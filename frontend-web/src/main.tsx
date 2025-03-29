import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from "@/components/ui/sonner"
 
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
   <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </BrowserRouter>
);
