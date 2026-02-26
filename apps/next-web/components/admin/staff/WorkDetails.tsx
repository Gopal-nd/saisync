'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axiosInstance'
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { WorkFormType, workSchema } from '@/schema/students'



export default function UserWorkDetails({ id }: { id: string }) {
  const form = useForm<WorkFormType>({
    resolver: zodResolver(workSchema),
    defaultValues: {
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentlyWorking: false,
      experiance: '',
    },
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['work', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students/work', { params: { id } })
      return res.data.data
    },
  })

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        startDate: data.startDate?.split('T')[0] || '',
        endDate: data.endDate?.split('T')[0] || '',
      })
    }
  }, [data, form])

  const mutation = useMutation({
    mutationFn: async (values: WorkFormType) => {
      const res = await axiosInstance.put('/api/students/work', { ...values, id })
      return res.data
    },
    onSuccess: (res) => {
      toast.success(res?.message || 'Work details updated')
      refetch()
    },
    onError: () => toast.error('Failed to update'),
  })

  const onSubmit = (values: WorkFormType) => mutation.mutate(values)

  return (
    <div className="max-w-xl mx-auto mt-10 shadow-xl p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-center mb-6">Work Details</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField name="companyName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl><Input placeholder="eg: Infosys" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="position" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl><Input placeholder="eg: Software Engineer" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="grid grid-cols-2 gap-4">
            <FormField name="startDate" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="endDate" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} disabled={form.watch('isCurrentlyWorking')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField name="isCurrentlyWorking" control={form.control} render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Currently Working?</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="experiance" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Total Experience</FormLabel>
              <FormControl><Input placeholder="eg: 1.5 years" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isDirty}>
            Save Work Details
          </Button>
        </form>
      </Form>
    </div>
  )
}
