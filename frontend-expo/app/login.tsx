import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { getProfile, loginUser } from '../api/auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAuthStore from '@/store/useAuthStore';
import { getToken, storeToken } from '@/utils/storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser,setToken } = useAuthStore();
  const router = useRouter();
 
 
  const mutation = useMutation({
    mutationFn: () => loginUser(email, password),
    onSuccess: (data) => {
      setUser({
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        usn: data.user.usn,
        name: data.user.name,
      });
      console.log("user details is ",data.user)
      setToken(data.token);
      storeToken(data.token);
      router.replace('/(tabs)/profile');
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Login failed');
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title={mutation.isPending ? "Logging in..." : "Login"} onPress={() => mutation.mutate()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});
