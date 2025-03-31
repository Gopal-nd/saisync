import { View, Text, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../api/auth';
import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';
import { removeToken } from '@/utils/storage';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const { user, clearUser, token, setUser } = useAuthStore();
const handleLogOut = () => {
  removeToken();
    clearUser();
    router.replace('/login');
  };
  

  return (
    <View>
      <Text>Welcome, {user?.email}</Text>
      <Text>Role: {user?.role}</Text>
      <Text>Token: {token}</Text>
      <Button title="Logout" onPress={handleLogOut} />
    </View>
  );
}
