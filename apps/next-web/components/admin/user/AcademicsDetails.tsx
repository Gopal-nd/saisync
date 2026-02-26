'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axiosInstance'

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
import { AcademicFormType, academicSchema } from '@/schema/students'



export default function AcademicsDetails({ id }: { id: string }) {
  const form = useForm<AcademicFormType>({
    resolver: zodResolver(academicSchema),
    defaultValues: {
      tenthBoard: '',
      tenthSchoolName: '',
      tenthMarks: undefined,
      tenthMaxMarks: undefined,
      tenthPercentage: undefined,
      twelfthBoard: '',
      twelfthSchoolName: '',
      twelfthMarks: undefined,
      twelfthMaxMarks: undefined,
      twelfthPercentage: undefined,
      entranceExamName: '',
      entranceExamScore: undefined,
      entranceExamMaxScore: undefined,
      entranceExamRank: undefined,
    },
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['academics', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students/acadamic',{params:{id}}  )
      return res.data
    },
  })

  useEffect(() => {
    if (data) {
      form.reset(data.data)
    }
  }, [data, form])

  const mutation = useMutation({
    mutationFn: async (data: AcademicFormType) => {
      const res = await axiosInstance.put('/api/students/acadamic', { ...data, id })
      return res.data
    },
    onSuccess: (res) => {
      toast.success(res?.message || 'Academics updated')
      refetch()
    },
    onError: () => {
      toast.error('Something went wrong!')
    },
  })

  const onSubmit = (data: AcademicFormType) => {
    mutation.mutate(data)
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 shadow-xl p-6 rounded-xl">
      <h2 className="text-xl text-center font-semibold mb-6">Academic Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 10th Details */}
          <FormField name="tenthBoard" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>10th Board</FormLabel>
              <FormControl><Input placeholder="CBSE / State" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="tenthSchoolName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>10th School Name</FormLabel>
              <FormControl><Input placeholder="School Name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="tenthMarks" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>10th Marks</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="tenthMaxMarks" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>10th Max Marks</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="tenthPercentage" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>10th Percentage</FormLabel>
              <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* 12th Details */}
          <FormField name="twelfthBoard" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>12th Board</FormLabel>
              <FormControl><Input placeholder="CBSE / State" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="twelfthSchoolName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>12th School Name</FormLabel>
              <FormControl><Input placeholder="School Name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="twelfthMarks" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>12th Marks</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="twelfthMaxMarks" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>12th Max Marks</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="twelfthPercentage" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>12th Percentage</FormLabel>
              <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Entrance Exam */}
          <FormField name="entranceExamName" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Entrance Exam Name</FormLabel>
              <FormControl><Input placeholder="CET / JEE / NEET" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="entranceExamScore" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Score</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="entranceExamMaxScore" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Max Score</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField name="entranceExamRank" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Rank</FormLabel>
              <FormControl><Input type="number" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="sm:col-span-2 mt-4">
            <Button type="submit" disabled={isLoading || !form.formState.isDirty} className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
