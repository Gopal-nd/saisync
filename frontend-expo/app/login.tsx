import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

import { getProfile, loginUser } from '../api/auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAuthStore from '@/store/useAuthStore';
import { getToken, storeToken } from '@/utils/storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser,setToken,token } = useAuthStore();
  const router = useRouter();
 useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken(); 
      if (token) {
        console.log("token is ",token)
        const data = await getProfile(token||"");
        setUser({
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          usn: data.user.usn,
          name: data.user.name,
        });
        setToken(token);
        data.user?.role === "STUDENT" && router.replace('/(student)/profile') 
        data.user?.role === "STAFF" && router.replace('/(staff)/classes') 
        data.user?.role === "ADMIN" && router.replace('/(admin)/adminprofile') 
      }
    };
    checkAuth();
  }, []);
 
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
      data.user?.role === "STUDENT" && router.replace('/(student)/profile') 
      data.user?.role === "STAFF" && router.replace('/(staff)/classes') 
      data.user?.role === "ADMIN" && router.replace('/(admin)/adminprofile') 

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
      <Link href={'/forgot-password'} style={{color:'blue',margin:2}} >Forgot Password</Link>
      <Button title={mutation.isPending ? "Logging in..." : "Login"} onPress={() => mutation.mutate()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});
