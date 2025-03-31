import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import useAuthStore from '@/store/useAuthStore';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/utils/queryClient';
import { getToken } from '@/utils/storage';
import { getProfile } from '@/api/auth';


export default function RootLayout() {
  const { isAuthenticated ,setUser,setToken,user} = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      
      if (token) {
        console.log("token is ",token)
        const data = await getProfile(token||"");
        console.log(data)
        setUser({
          id: data.data?.id,
          email: data.data?.email,
          role: data.data?.role,
          usn: data.data?.usn,
          name: data.data?.name,
        });
        setToken(token);

        data.data?.role === "STUDENT" && router.replace('/(student)/profile') 
        data.data?.role === "STAFF" && router.replace('/(staff)/classes') 
        data.data?.role === "ADMIN" && router.replace('/(admin)/adminprofile') 
        router.replace('/login');
        
   
      } else {
        router.replace('/login');
      }
    };
    checkAuth();
  }, []);


  return ( 
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{headerShown:false, }} />
    </QueryClientProvider>

)
}
