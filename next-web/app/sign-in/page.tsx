"use client"
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {LoginSchema} from '@/schema'
import { Select, SelectItem, SelectTrigger, SelectContent } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const branches = ['AIML', 'ECE', 'CSE', 'EEE', 'ISE', 'MECH'] as const;
const semesters = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'] as const;
const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
const schemas = ['2021', '2022', '2023'] as const;
const roles = ['STUDENT', 'ADMIN', 'STAFF']



export default function LoginPage() {

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      password:'sairam123',
    }
  })

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post('/api/auth/sign-in', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Login successful');
      router.push('/dashboard')
    },
    onError: (error) => {
      console.log(error)
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data.message);
      }else{
        toast.error('something went wrong ,Login Failed')
      }
    },
  });

  const onSubmit = (data: any) => {
    console.log(data)
    mutation.mutate(data)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="sce22am039@sairamtap.edu.in" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the User Email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input

                    {...field}
                    placeholder='******'
                    type='password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className='text-blue-500'>
          <Link href={'/reset-password'}>Forgot Password?</Link>
          </p>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      
    </div>
  );
}
