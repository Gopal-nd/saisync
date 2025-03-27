import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import useAuthStore from '@/store/useAuthStore';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/utils/queryClient';
import { getToken } from '@/utils/storage';
import { getProfile } from '@/api/auth';


export default function RootLayout() {
  const { isAuthenticated ,setUser,setToken} = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      
      if (token) {
        const data = await getProfile(token||"");
        setUser({
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          usn: data.user.usn,
          name: data.user.name,
        });
        setToken(token);

        router.replace('/(tabs)/profile');
   
      } else {
        router.replace('/login');
      }
    };
    checkAuth();
  }, []);


  return ( 
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{headerShown:false}} />
    </QueryClientProvider>

)
}
