"use client"
import React, { useState } from 'react';
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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { ResetPasswordSchema, PasswordSchema } from '@/schema'
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from 'next/navigation';
import { InputOTPForm } from '@/components/OPTPage';

export default function ResetPassword() {
    const [isOtp, setIsOtp] = useState(false);
    const [isOtpCorrect, setIsOtpCorrect] = useState(false);
    const [otp, setOtp] = useState('');
    const router = useRouter();

    // Form for email input
    const emailForm = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            email: '',
        }
    });

    // Form for password reset
    const passwordForm = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            password: '',
            email: '',
            otp: ''
        },
    });

    // Update password form email when email form changes
    const email = emailForm.watch('email');
    
    // Reset mutation for both sending OTP and setting new password
    const resetMutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await axiosInstance.post('/api/auth/reset', data);
            return response.data;
        },
        onSuccess: () => {
            if (isOtpCorrect) {
                toast.success('Successfully reset password');
                router.push('/sign-in');
            } else {
                toast.success('OTP sent successfully');
                setIsOtp(true);
            }
        },
        onError: (error) => {
            console.error(error);
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else {
                toast.error('Something went wrong, couldn\'t complete the request');
            }
        },
    });

    // Handle email form submission
    const onSubmitEmail = (data: z.infer<typeof ResetPasswordSchema>) => {
        resetMutation.mutate({ email: data.email });
        
        // Update password form with the email
        passwordForm.setValue('email', data.email);
    };

    // Handle password form submission
    const onSubmitPassword = (data: z.infer<typeof PasswordSchema>) => {
        // Ensure OTP is included
        data.otp = otp;
        resetMutation.mutate(data);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl">
            <h2 className="text-2xl font-bold mb-6">
                {!isOtp ? 'Forgot Password' : !isOtpCorrect ? 'Enter OTP' : 'Reset Password'}
            </h2>
            
            {/* Step 1: Email Form */}
            {!isOtp && (
                <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-5">
                        <FormField
                            control={emailForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="sce22am039@sairamtap.edu.in" type='email' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={resetMutation.isPending}>
                            {resetMutation.isPending ? 'Sending...' : 'Send OTP'}
                        </Button>
                    </form>
                </Form>
            )}
            
            {/* Step 2: OTP Form */}
            {isOtp && !isOtpCorrect && (
                <InputOTPForm 
                    isOptCorrect={isOtpCorrect} 
                    setIsOptCorrect={setIsOtpCorrect} 
                    setOtp={setOtp} 
                    email={email} 
                />
            )}
            
            {/* Step 3: New Password Form */}
            {isOtp && isOtpCorrect && (
                <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-5">
                        <FormField
                            control={passwordForm.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
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
                        <Button type="submit" disabled={resetMutation.isPending}>
                            {resetMutation.isPending ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    );
}