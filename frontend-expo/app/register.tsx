import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from '../api/auth';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      console.log(email,password)
    const res =   await registerUser(email, password);
    if(res!==null){
      Alert.alert('Registration Successful');
      router.push('/login');
    }
    } catch (error:any) {
      console.log(error)
      Alert.alert('Error', error.response?.data?.error || 'Registration Failed');
    }
  };

  return (
    <View>
      <Text>Register</Text>
      <TextInput placeholder="email" value={email} onChangeText={setUsername} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Login" onPress={() => router.push('/login')} />
    </View>
  );
}
