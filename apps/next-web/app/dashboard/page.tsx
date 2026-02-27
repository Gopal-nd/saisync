'use client';

import useUserRedirect from "@/hooks/useUserRedirect";

export default function Dashboard() {
useUserRedirect();

return (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-2xl font-bold">Redirecting...</h1>
  </div>
);
}