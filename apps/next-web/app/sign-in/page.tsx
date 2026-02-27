 "use client"
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
import Link from 'next/link';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';
import { axiosFrontend } from '@/lib/axios';

export default function LoginPage() {
  const { setUser } = useAuthStore();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
  
      const response = await axiosFrontend.post('/api/auth/sign-in', data);
      return response.data;
    },
    onSuccess: (data) => {
       const token =  data.data.data.token
       console.log(token)
        if (token) {
    // 1) set in axios default so every subsequent call to EC2 includes Authorization header
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // 2) store in memory (Zustand) so UI and logout can clear it — avoid localStorage if possible
    useAuthStore.getState().setToken(token); // or however your store sets token
  }
      // Adjust these accesses to match your backend response shape
      const sendUser = data?.data?.data?.sendUser ?? data?.sendUser ?? null;
      if (!sendUser) {
        toast.success('Login successful');
        router.push('/');
        return;
      }

      if (sendUser.role === 'SUPPORT_STAFF') {
        router.push(`/support-staff`);
      } else {
        router.push(`/${sendUser.role.toLowerCase()}`);
      }

      toast.success('Login successful');

      setUser({
        email: sendUser.email,
        id: sendUser.id,
        role: sendUser.role,
        branch: sendUser.branch,
        name: sendUser.name,
        semester: sendUser.semester,
        section: sendUser.section,
        usn: sendUser.usn,
        schema: sendUser.schema,
        mentor: sendUser.mentor,
      });
    },
    onError: (error) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Login failed');
      } else {
        toast.error('Something went wrong, login failed');
      }
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

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
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Logging in...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

