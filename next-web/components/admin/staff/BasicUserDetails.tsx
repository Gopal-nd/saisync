'use client'

import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useMutation, useQuery } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { toast } from 'sonner'
import axios from 'axios'

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  usn: z.string().optional(),
  collageId: z.string().optional(),
  section: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']),
  schema: z.enum(['Y_2022', 'Y_2021', 'Y_2018', 'Y_2024']),
  branch: z.enum(['AIML', 'ECE', 'CSE', 'EEE', 'ISE', 'MECH']),
  semester: z.enum(['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8']),
  isVerified: z.boolean(),
})

const BasicUserDetails = ({ id }: { id: string }) => {
  const { data, isLoading,refetch } = useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students', { params: { id } })
      return res.data.data
    }
  })

  const form = useForm({
    resolver: zodResolver(schema),
    values: {
      name: data?.name ?? '',
      usn: data?.usn ?? '',
      collageId: data?.collageId ?? '',
      section: data?.section ?? '',
      schema: data?.schema ?? '',
      branch: data?.branch ?? '',
      semester: data?.semester ?? '',
      isVerified: data?.isVerified ?? false
    },
  })

  // write mutate function to api/srudents/edit
  const { mutate } = useMutation({
    mutationFn: async (data: z.infer<typeof schema>) => {
      const res = await axiosInstance.put(`/api/students/edit`, {...data,id})
      return res.data.data
    },
    onSuccess: (data) => {
      toast.success('User details updated successfully');
      refetch()
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || 'Failed to update user details');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  })


  const onSubmit = (formData: z.infer<typeof schema>) => {
    console.log(formData)
    mutate(formData)
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="p-6 max-w-2xl mx-auto shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">Basic User Details</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* Name */}
          <FormField name="name" control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* USN */}
          <FormField name="usn" control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>USN</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* College ID */}
          <FormField name="collageId" control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>College ID</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Section */}
          <FormField name="section" control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Schema */}
          <FormField name="schema" control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schema</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Schema" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Y_2022', 'Y_2021', 'Y_2018', 'Y_2024'].map(y => (
                        <SelectItem key={y} value={y}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Branch */}
          <FormField name="branch" control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {['AIML', 'ECE', 'CSE', 'EEE', 'ISE', 'MECH'].map(b => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Semester */}
          <FormField name="semester" control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semester</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'].map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* isVerified */}
          <FormField name="isVerified" control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormLabel>Is Verified</FormLabel>
                <FormControl>
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty} className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default BasicUserDetails
