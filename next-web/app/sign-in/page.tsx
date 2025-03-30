'use client'
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginFormTypes, loginSchema } from '@/schema';
import axios from 'axios';
import { toast } from 'sonner';
import useAuthStore from '@/store/useAuthStore';
import { redirect } from 'next/navigation';


axios.defaults.withCredentials = true;
const LoginForm: React.FC = () => {
  

const {clearToken, clearUser, isAuthenticated, setToken, setUser, token, user} = useAuthStore()


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormTypes>({
    resolver: zodResolver(loginSchema),
  });
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const onSubmit = async(data: LoginFormTypes) => {

    const loginData = {
      email:data.email,
      password:data.password
    }

    try {
      
      const res = await axios.post(`${backendUrl}/api/auth/sign-in`,loginData)
      toast.success(res.data.message)
      setToken(res.data.data.token)
      const user = res.data.data.sendUser
      setUser({
        email:user.email,
        id:user.id,
        role:user.role,
        name:user.name,
        usn:user.usn,
        branch:user.branch,
        semester:user.semester,
        section:user.section,
      })
      redirect('/dasboard')

    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message)
        console.log('error in the login page',error.response?.data.message)
      }
    }
    
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email" className="block mb-1">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            className="w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="block mb-1">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            className="w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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
