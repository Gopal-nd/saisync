'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginFormTypes, loginSchema } from '@/schema';
import axios from 'axios';
import { toast } from 'sonner';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

axios.defaults.withCredentials = true;

const LoginForm: React.FC = () => {
  const { setToken, setUser } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormTypes>({
    resolver: zodResolver(loginSchema),
  });

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const onSubmit = async (data: LoginFormTypes) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/sign-in`, {
        email: data.email,
        password: data.password,
      });

      toast.success(res.data.message);
      setToken(res.data.data.token);
      const user = res.data.data.sendUser;
      setUser({ ...user });

      router.push('/dashboard'); // Redirect using useRouter
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || 'Login failed');
        console.error('Login error:', error.response?.data.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
