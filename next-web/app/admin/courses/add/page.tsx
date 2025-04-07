'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { toast } from 'sonner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { SubjectFormType, subjectSchema } from '@/schema/subjects'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'


export default function SubjectForm() {
  const router = useRouter()
  const form = useForm<SubjectFormType>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      isLab: false,
      year: "2022",
    },
  })

  const mutation = useMutation({
    mutationFn: async (values: SubjectFormType) => {
      const res = await axiosInstance.post('/api/subjects/create', values)
      return res.data
    },
    onSuccess: () => {
      toast.success('Subject created successfully')
      router.push('/admin/courses')
    },
    onError: (error:any) => {

    console.log(error)
    toast.error(error?.response?.data?.message || 'Something went wrong')

    },
  })

  const onSubmit = (values: SubjectFormType) => {
    mutation.mutate(values)
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6 text-center">Create New Subject</h2>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Exam Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INTERNAL">INTERNAL</SelectItem>
                    <SelectItem value="EXTERNAL">EXTERNAL</SelectItem>
                  </SelectContent>
                </Select>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Written Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MCQ">MCQ</SelectItem>
                    <SelectItem value="WRITTEN">WRITTEN</SelectItem>
                  </SelectContent>
                </Select>
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
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
