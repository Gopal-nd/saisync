import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../api/auth';
import { storeToken } from '../utils/storage';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      await storeToken(data.token);
      Alert.alert('Login Successful');
      router.push('/protected');
    } catch (error:any) {
      Alert.alert('Error', error.response?.data?.error || 'Login Failed');
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="email" value={email} onChangeText={setemail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => router.push('/register')} />
    </View>
  );
}
