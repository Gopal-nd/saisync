'use client'

import { useForm } from 'react-hook-form'
import { number, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FamilyFormType, familySchema } from '@/schema/students'
import { useEffect } from 'react'

export default function FamilyDetails({id}:{id:string}) {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['family', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/students/family`, { params: { id } })
      return res.data.data
    }
  })

  const form = useForm<FamilyFormType>({
    resolver: zodResolver(familySchema),
    defaultValues: {
      fatherName: '',
      fatherPhone: '',
      motherName: '',
      motherPhone: '',
      fatherIncome: undefined,
      motherIncome: undefined,
      gardianName: '',
      guardianPhone: '',
      seblingName: '',
      fatherOccupation: '',
      motherOccupation: ''
    },
  })

  useEffect(() => {
    if (data) {
      form.reset({
        fatherName: data.fatherName || '',
        fatherPhone: data.fatherPhone || '',
        motherName: data.motherName || '',
        motherPhone: data.motherPhone || '',
        fatherIncome: data.fatherIncome || undefined,
        motherIncome: data.motherIncome || undefined,
        gardianName: data.gardianName || '',
        guardianPhone: data.guardianPhone || '',
        seblingName: data.seblingName || '',
        fatherOccupation: data.fatherOccupation || '',
        motherOccupation: data.motherOccupation || ''
      })
    }
  }, [data, form])

  const mutation = useMutation({
    mutationFn: async (formData: FamilyFormType) => {
      const response = await axiosInstance.put('/api/students/family', { ...formData, id })
      return response.data
    },
    onSuccess: (data) => {
      toast.success(data?.message)
      refetch()
    },
    onError: () => {
      toast.error('Something went wrong!')
    }
  })

  const onSubmit = (formData: FamilyFormType) => {
    mutation.mutate(formData)
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 shadow-xl">
      <h2 className="text-xl text-center font-semibold mb-6">Family Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Father */}
          <FormField name="fatherName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Name</FormLabel>
              <FormControl><Input placeholder="Father's Name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="fatherPhone" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Phone</FormLabel>
              <FormControl><Input placeholder="Father's Phone" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="fatherOccupation" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Occupation</FormLabel>
              <FormControl><Input placeholder="Father's Occupation" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="fatherIncome" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Income</FormLabel>
              <FormControl><Input type="number" placeholder="Father's Income" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Mother */}
          <FormField name="motherName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Name</FormLabel>
              <FormControl><Input placeholder="Mother's Name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="motherPhone" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Phone</FormLabel>
              <FormControl><Input placeholder="Mother's Phone" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="motherOccupation" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Occupation</FormLabel>
              <FormControl><Input placeholder="Mother's Occupation" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="motherIncome" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Income</FormLabel>
              <FormControl><Input type="number" placeholder="Mother's Income" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Guardian */}
          <FormField name="gardianName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Guardian's Name</FormLabel>
              <FormControl><Input placeholder="Guardian's Name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="guardianPhone" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Guardian's Phone</FormLabel>
              <FormControl><Input placeholder="Guardian's Phone" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Sibling */}
          <FormField name="seblingName" control={form.control} render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Sibling's Name</FormLabel>
              <FormControl><Input placeholder="Sibling's Name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="sm:col-span-2 mt-4">
            <Button type="submit" disabled={isLoading || !form.formState.isDirty} className="w-full">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}