'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axiosInstance'
import { useEffect, useState } from 'react'
import {
  StudyMaterialFormType,
  studyMaterialSchema
} from '@/schema/subjects'
import useAuthStore from '@/store/useAuthStore'
import { UploadDropzone } from '@/utils/uploadthing'
import { axiosFrontend } from '@/lib/axios'

interface Subject {
  id: string
  refetch: () => void
  setOpen: (open: boolean) => void
  initialData: any
}

export default function EditStydyMaterialForm({ id,initialData ,setOpen,refetch}: Subject) {
  const { user } = useAuthStore()
  const [fileUrl, setFileUrl] = useState('')
  const [fileError, setFileError] = useState('')
  const {data,isLoading} = useQuery({
    queryKey:['material',id],
    queryFn:async()=>{
      const res = await axiosInstance.get('/api/study-materials/material',{params:{id}})
      return res.data
    }
  })


  console.log(data)
  const form = useForm<StudyMaterialFormType>({
    resolver: zodResolver(studyMaterialSchema),
    defaultValues: {
      name: '',
      description: '',
      url: '',
    }
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name || '',
        description: initialData.description || '',
        url: initialData.url || '',
      })
      setFileUrl(initialData.url)
    }
  }, [initialData])
  const mutation = useMutation({
    mutationFn: async (values: StudyMaterialFormType) => {
      const payload = {
        ...values,
        id: id,
        uploadedBy: user?.id, // Make sure user.id is available
      }

      const res = await axiosInstance.put('/api/study-materials/update', payload)
      return res.data
    },
    onSuccess: (data) => {
      console.log(data?.message)
      toast.success(data?.message)
      setOpen(false)
      refetch()
      setFileUrl('')
      form.reset()
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to upload material. Please try again.")
    }
  })

  const onSubmit = async (values: any) => {
    if (!fileUrl) {
      setFileError("Please upload a file before submitting")
      return
    }

    setFileError('')
    console.log(values)
    mutation.mutate({
      name: values.name,
      description: values.description,
      url: fileUrl,
    })
  }
  const handleDeleteFile = async() =>{
   const res = await axiosFrontend.delete('/api/uploadthing',{data:{url:fileUrl}})
   console.log(res.data)
   if(res.data?.message=='ok'){
    setFileUrl('')
   }
   return true
  }

  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6 text-center">Edit Study Material</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material Name</FormLabel>
                <FormControl><Input placeholder="Eg: Unit 1 Notes" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (optional)</FormLabel>
                <FormControl><Textarea placeholder="E.g. Chapter 1 to 3 summary" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Upload File</FormLabel>
            <FormControl>
              {fileUrl ? (
                <>
                <iframe
                  src={fileUrl}
                  className="w-full h-64 border rounded-md"
                  />
                <span onClick={handleDeleteFile} className='bg-red-500 p-2 text-center rounded-md'>Delete</span>
                  </>
              ) : (
                <UploadDropzone
                  endpoint="pdfUploader"
                  appearance={{
                    label: "text-sm text-gray-500",
                    allowedContent: "text-xs text-muted-foreground",
                  }}
                  className="w-full"
                  onClientUploadComplete={(res) => {
                    const url = res[0].ufsUrl
                    form.setValue("url", url)
                    setFileUrl(url)
                    setFileError('')
                  }}
                  onUploadError={(error: Error) => {
                    setFileError(`Upload failed: ${error.message}`)
                  }}
                />
              )}
            </FormControl>
            {fileError && (
              <p className="text-sm text-red-500 mt-1">{fileError}</p>
            )}
          </FormItem>

          <Button type="submit" className="w-full" disabled={mutation.isPending || !fileUrl}>
            {mutation.isPending ? 'Uploading...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
