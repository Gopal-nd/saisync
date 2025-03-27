import { Slot, Tabs, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getToken } from '../utils/storage';

export default function Layout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      if (token) {
        setIsAuthenticated(true);
      } else {
        router.replace('/login');
      }
    };
    checkAuth();
  }, []);

  return (  <Tabs>
        {/* Define your screens */}
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="login" options={{ title: 'Login' }} />
        <Tabs.Screen name="protected" options={{ title: 'Login' }} />
        <Tabs.Screen name="register" options={{ title: 'Register' }} />
      </Tabs>
)
}
