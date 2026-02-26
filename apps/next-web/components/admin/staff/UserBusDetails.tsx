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
import { BusFormType, busSchema } from '@/schema/students'


export default function UserBusDetails({ id }: { id: string }) {
  const form = useForm<BusFormType>({
    resolver: zodResolver(busSchema),
    defaultValues: {
      route: '',
      busNumber: '',
      pickupPoint: '',
      isUsingBus: false,
    },
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['bus', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students/bus', { params: { id } })
      return res.data.data
    },
  })

  useEffect(() => {
    if (data) form.reset(data)
  }, [data, form])

  const mutation = useMutation({
    mutationFn: async (data: BusFormType) => {
      const res = await axiosInstance.put('/api/students/bus', { ...data, id })
      return res.data
    },
    onSuccess: (res) => {
      toast.success(res?.message || 'Bus details updated')
      refetch()
    },
    onError: () => toast.error('Failed to update'),
  })

  const onSubmit = (data: BusFormType) => mutation.mutate(data)

  return (
    <div className="max-w-xl mx-auto mt-10 shadow-xl p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-center mb-6">Bus Details</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField name="route" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Route</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="busNumber" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Bus Number</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="pickupPoint" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Point</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="isUsingBus" control={form.control} render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Currently Using Bus?</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <Button type="submit" className="w-full" disabled={isLoading || !form.formState.isDirty}>
            Save Bus Details
          </Button>
        </form>
      </Form>
    </div>
  )
}
