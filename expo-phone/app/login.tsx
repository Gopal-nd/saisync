import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground, 
  KeyboardAvoidingView, 
  Platform,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Image
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

import { getProfile, loginUser } from '../api/auth';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@/store/useAuthStore';
import { getToken, storeToken } from '@/utils/storage';
import axios from 'axios';

// Correct image import
// Make sure this path is correct for your project structure
// import logo from '../assets/images/sailogin.jpg';

const { width, height } = Dimensions.get('window');

interface User {
  id: string;
  email: string;
  role: string;
  usn: string;
  name: string;
}

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const token = await getToken();
      if (token) {
        console.log("token is ", token);
        const data = await getProfile(token || "");
        setUser({
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          usn: data.user.usn,
          name: data.user.name,
        });
        setToken(token);
        data.user?.role === "STUDENT" && router.replace('/(student)/profile');
        data.user?.role === "STAFF" && router.replace('/(staff)/classes');
        data.user?.role === "ADMIN" && router.replace('/(admin)/adminprofile');
      }
    };
    checkAuth();
  }, []);

  const mutation = useMutation({
    mutationFn: () => loginUser(email, password),
    onSuccess: (data) => {
      console.log(data);
      setUser({
        id: data.data.sendUser?.id,
        email: data.data.sendUser?.email,
        role: data.data.sendUser?.role,
        usn: data.data.sendUser?.usn,
        name: data.data.sendUser?.name,
      });
      console.log("user details is ", data.data.token);
      setToken(data.data.token);
      storeToken(data.data.token);
      data.data.sendUser?.role === "STUDENT" && router.replace('/(student)/profile');
      data.data.sendUser?.role === "STAFF" && router.replace('/(staff)/classes');
      data.data.sendUser?.role === "ADMIN" && router.replace('/(admin)/adminprofile');
    },
    onError: (error: unknown) => {
      if(axios.isAxiosError(error)){
        alert(error.response?.data?.message || 'Login failed');
      } else if (error instanceof Error) {
        alert(error.message || 'Login failed');
      } else {
        alert('An unknown error occurred');
      }
    },
  });

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <ExpoStatusBar style="light" />
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
          >
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                {/* Fixed image rendering */}
                {/* <Image 
                  source={logo} 
                  style={styles.logoImage} 
                  resizeMode="cover"
                /> */}
              </View>
              <Text style={styles.appName}>Sai Sync</Text>
              <Text style={styles.tagline}>Your Learning Journey Starts Here</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.subText}>Sign in to continue</Text>

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#fff" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#aaa"
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.visibilityIcon}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <Link href="/forgot-password" style={styles.forgotPassword}>
                Forgot Password?
              </Link>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => mutation.mutate()}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Sign In</Text>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingTop: 0,
    marginTop: 0,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  keyboardAvoid: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    backgroundColor: '#fff', // Add background in case image has transparency
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  logoText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: 'rgba(25, 29, 43, 0.85)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#fff',
    fontSize: 16,
  },
  visibilityIcon: {
    padding: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 25,
    marginTop: 5,
  },
  loginButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#3498db',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});