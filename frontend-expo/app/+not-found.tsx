import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { getToken } from '@/utils/storage';

export default function NotFound() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await getToken();
        setToken(storedToken);
        console.log("Token is:", storedToken);

        if (storedToken) {
          router.replace('/login');
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, [router]);

  return (
    <View>
      <Text>Not Found</Text>
      <Link href={'/login'}>Back to Login</Link>
    </View>
  );
}
