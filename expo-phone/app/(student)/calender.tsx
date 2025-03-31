import { View, Text, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../../api/auth';
import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';

export default function Calender() {
  const { user, clearUser, token, setUser } = useAuthStore();
  
console.log(user)

  return (
    <View>
      <Text>Welcome, {user?.email}</Text>
      <Text>Role: {user?.role}</Text>
      <Text>Token: {token}</Text>
      <Button title="Logout" onPress={clearUser} />
    </View>
  );
}
