import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getProtectedData } from '../api/auth';
import { getToken, removeToken } from '../utils/storage';

export default function ProtectedScreen() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        try {
          const data = await getProtectedData(token);
          setMessage(data.user);
        } catch (error:any) {
          Alert.alert('Error', error.response?.data?.error || 'Failed to fetch data');
        }
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await removeToken();
    router.push('/login');
  };

  return (
    <View>
      <Text>{JSON.stringify(message)}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
