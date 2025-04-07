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
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'


export default function SubjectForm() {
  const params = useParams()
  const id = params.id
  // console.log(id)
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/subjects', { params: { id: id } })
      return res.data.data
    }
  })

  const form = useForm<SubjectFormType>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      isLab: data?.isLab,
      year: data?.year,
      examType: data?.examType,
      noOfCredits: data?.noOfCredits,
      noOfHours: data?.noOfHours,
      subjectCode: data?.subjectCode,
      subjectName: data?.subjectName,
      syllabus: data?.syllabus,
      writtenType: data?.writtenType
    },
  })

  useEffect(() => {
    form.reset({
      isLab: data?.isLab,
      year: data?.year,
      examType: data?.examType,
      noOfCredits: data?.noOfCredits,
      noOfHours: data?.noOfHours,
      subjectCode: data?.subjectCode,
      subjectName: data?.subjectName,
      syllabus: data?.syllabus,
      writtenType: data?.writtenType
    })
  }, [form, data])
  const mutation = useMutation({
    mutationFn: async (values: SubjectFormType) => {
      const res = await axiosInstance.post('/api/subjects/edit', { ...values, id })
      return res.data
    },
    onSuccess: (data) => {
      toast.success(data.message)

    },
    onError: (error: any) => {

      console.log(error)
      toast.error(error?.response?.data?.message || 'Something went wrong')

    },
  })

  const onSubmit = (values: SubjectFormType) => {
    mutation.mutate(values)
  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 ">
        <h2 className="text-2xl font-bold border-b pb-2">Subject Details</h2>
      <div className="p-6 rounded-2xl shadow-md max-w-xl w-full mx-auto space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><strong>Name:</strong> {data?.subjectName}</div>
          <div><strong>Code:</strong> {data?.subjectCode}</div>
          <div><strong>Year:</strong> {data?.year}</div>
          <div><strong>No. of Credits:</strong> {data?.noOfCredits}</div>
          <div><strong>No. of Hours:</strong> {data?.noOfHours || "N/A"}</div>
          <div><strong>Exam Type:</strong> {data?.examType}</div>
          <div><strong>Written Type:</strong> {data?.writtenType}</div>
          <div><strong>Is Lab:</strong> {data?.isLab ? "Yes" : "No"}</div>
          <div className="sm:col-span-2"><strong>Syllabus:</strong> {data?.syllabus || "Not Provided"}</div>
        </div>
      </div>
      <div className='border-b mt-6 pb-2 flex flex-row items-center justify-between'>
        <h2 className="text-2xl font-bold ">Studay Materials </h2>
        <Button onClick={()=>setOpen((prev)=>!prev)} variant={'outline'}><Plus/> Add</Button>
      </div>
      {
        open && (
          <div className='mt-4'>
            <StudyMaterialForm id={id} refetch={refetch} setOpen={setOpen}/>
          </div>
        )
      }
    </div>
  )
}
