'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation, useQuery } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { SubjectFormType, subjectSchema } from '@/schema/subjects'
import { Textarea } from '@/components/ui/textarea'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'


export default function SubjectForm() {
  const params = useParams()
  const id = params.id
  console.log(id)
  const router = useRouter()

  const {data, isLoading,refetch} = useQuery({
    queryKey:['course',id],
    queryFn:async()=>{
      const res = await axiosInstance.get('/api/subjects',{params:{id:id}})
      // console.log(res)
      return res.data.data
    }
  })

  const form = useForm<SubjectFormType>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      isLab: data?.isLab,
      year: data?.year,
      examType:data?.examType,
      noOfCredits: data?.noOfCredits,
      noOfHours: data?.noOfHours,
      subjectCode: data?.subjectCode,
      subjectName: data?.subjectName,
      syllabus: data?.syllabus,
      writtenType: data?.writtenType
    },
  })

  useEffect (() => {
    form.reset({
      isLab: data?.isLab,
      year: data?.year,
      examType:data?.examType,
      noOfCredits: data?.noOfCredits,
      noOfHours: data?.noOfHours,
      subjectCode: data?.subjectCode,
      subjectName: data?.subjectName,
      syllabus: data?.syllabus,
      writtenType: data?.writtenType
    })
  },[form,data])
  const mutation = useMutation({
    mutationFn: async (values: SubjectFormType) => {
      const res = await axiosInstance.post('/api/subjects/edit', {...values,id})
      return res.data
    },
    onSuccess: (data) => {
      // console.log(data)
      toast.success(data.message)
      // router.push('/admin/courses')
    },
    onError: (error:any) => {

    console.log(error)
    toast.error(error?.response?.data?.message || 'Something went wrong')

    },
  })

  const onSubmit = (values: SubjectFormType) => {
    mutation.mutate(values)
  }

  if(isLoading){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6 text-center">Edit The Subject</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="subjectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject Name</FormLabel>
                <FormControl><Input {...field} placeholder='eg. Computer Science'/></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjectCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject Code</FormLabel>
                <FormControl><Input {...field} className='uppercase' placeholder='eg. CS101' /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="noOfCredits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. of Credits</FormLabel>
                <FormControl><Input type="number" {...field} placeholder='eg. 3'   value={field.value ?? ""}  onChange={(e) => field.onChange(e.target.valueAsNumber)}/></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="examType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exam Type</FormLabel>
                <select
                         className="bg-input px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary/50"
                         {...field}
                       >
                         {['INTERNAL', 'EXTERNAL'].map((s) => (
                              <option className='bg-gray-900' key={s} value={s}>
                              {s}
                            </option>
                         ))}
                       </select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="writtenType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Written Type</FormLabel>
                <select
                         className="bg-input px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-primary/50"
                         {...field}
                       >
                         {['WRITTEN', 'MCQ'].map((s) => (
                              <option className='bg-gray-900' key={s} value={s}>
                              {s}
                            </option>
                         ))}
                       </select>
          
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="syllabus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Syllabus</FormLabel>
                <FormControl><Textarea {...field} placeholder="Optional" /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="noOfHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. of Hours</FormLabel>
                <FormControl><Input type="number" {...field} placeholder="Optional"  value={field.value ?? ""}  onChange={(e) => field.onChange(e.target.valueAsNumber)}/></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isLab"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Is Lab?</FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!form.formState.isDirty} className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
