"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "sonner"
import axiosInstance from "@/lib/axiosInstance"
import { useMutation } from "@tanstack/react-query"

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  email: z.string().email(),
})

export function InputOTPForm({isOptCorrect,setIsOptCorrect,email,setOtp}:{isOptCorrect:any,setIsOptCorrect:any,email:string,setOtp:any}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
      email:email
    },
  })


  const mutation = useMutation({
    mutationFn: async (data: any) => {
        console.log(data)
        setOtp(data.otp)
        const response = await axiosInstance.post('/api/auth/reset', data);
        console.log(response.data)
        return response.data;

    },
    onSuccess: () => {
        toast.success('Greate, now set Your new Password');
        setIsOptCorrect(true)

    },
    onError: (error) => {
        console.log(error)
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
        } else {
            toast.error('something went wrong ,coudn\'t send OTP')
        }
    },
});


 async function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
