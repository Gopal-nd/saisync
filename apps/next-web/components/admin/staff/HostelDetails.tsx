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
import { HostelFormType, hostelSchema } from '@/schema/students'



export default function UserHostelDetails({ id }: { id: string }) {
  const form = useForm<HostelFormType>({
    resolver: zodResolver(hostelSchema),
    defaultValues: {
      block: '',
      roomNumber: '',
      wardenName: '',
      isStaying: true,
    },
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['hostel', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students/hostel', { params: { id } })
      return res.data.data
    },
  })

  useEffect(() => {
    if (data) form.reset(data)
  }, [data, form])

  const mutation = useMutation({
    mutationFn: async (data: HostelFormType) => {
      const res = await axiosInstance.put('/api/students/hostel', { ...data, id })
      return res.data
    },
    onSuccess: (res) => {
      toast.success(res?.message || 'Hostel details updated')
      refetch()
    },
    onError: () => toast.error('Failed to update'),
  })

  const onSubmit = (data: HostelFormType) => mutation.mutate(data)

  return (
    <div className="max-w-xl mx-auto mt-10 shadow-xl p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-center mb-6">Hostel Details</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField name="block" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Block</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="roomNumber" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="wardenName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Warden Name (optional)</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="isStaying" control={form.control} render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Currently Staying?</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isDirty}>
            Save Hostel Details
          </Button>
        </form>
      </Form>
    </div>
  )
}
