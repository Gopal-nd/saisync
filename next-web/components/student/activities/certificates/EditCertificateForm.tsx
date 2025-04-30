'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { UploadDropzone } from '@/utils/uploadthing'
import Image from 'next/image'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '@/lib/axiosInstance'
import { axiosFrontend } from '@/lib/axios'

interface EditCertificateProps {
    id: string
    refetch: () => void
    setOpen: (open: boolean) => void

  }
export default function EditCertificateForm({ id ,setOpen,refetch}:EditCertificateProps) {
 
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 1,
    issuedBy: '',
    issueDate: '',
    expiryDate: '',
    imageUrl: '',
    proofUrl: '',
  })

  // Fetch certificate data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['certificate', id],
    queryFn: async () => {
      const res = await axios.get(`/api/students/activities/certificate/${id}`)
      return res.data.data
    }
  })

  useEffect(()=>{
    if(data){
        setFormData({
            title: data.title || '',
            description: data.description || '',
            duration: data.duration || 1,
            issuedBy: data.issuedBy || '',
            issueDate: data.issueDate?.slice(0, 10) || '',
            expiryDate: data.expiryDate?.slice(0, 10) || '',
            imageUrl: data.imageUrl || '',
            proofUrl: data.proofUrl || '',
          })
    }
  },[data])
  console.log(data)

  const updateMutation = useMutation({
    mutationFn: async () => {
      await axios.put(`/api/students/activities/certificate/edit`, {
        ...formData,
        issueDate: new Date(formData.issueDate),
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : null,
        id:id
      })
    },
    onSuccess: () => {
      toast.success('Certificate updated!')
      queryClient.invalidateQueries({ queryKey: ['certificate', id] })
      setOpen(false)
      refetch() 
      
    },
    onError: () => {
      toast.error('Failed to update certificate.')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDeleteImage = async () => {
    const res = await axiosFrontend.delete('/api/uploadthing', { data: { url: formData.imageUrl } })
    if (res.data?.message === 'ok') {
      toast.success('Image deleted')
      setFormData((prev) => ({ ...prev, imageUrl: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.imageUrl) return toast.error('Please upload an image.')
    updateMutation.mutate()
  }

  if (isLoading) return <div className="text-center py-10">Loading...</div>
  if (isError) return <div className="text-red-500 text-center py-10">Failed to load data.</div>

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-6">Edit Certificate</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <Input
          name="duration"
          type="number"
          placeholder="Duration (months)"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <Input name="issuedBy" placeholder="Issued By" value={formData.issuedBy} onChange={handleChange} required />
        <Input name="issueDate" type="date" value={formData.issueDate} onChange={handleChange} required />
        <Input name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} />
        <Input name="proofUrl" placeholder="Proof URL (optional)" value={formData.proofUrl} onChange={handleChange} />

        <div>
          {formData.imageUrl ? (
            <>
              <Image src={formData.imageUrl} alt="Certificate" width={200} height={200} className="mb-2" />
              <Button type="button" variant="destructive" onClick={handleDeleteImage}>
                Delete Image
              </Button>
            </>
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                const url = res[0].ufsUrl
                setFormData((prev) => ({ ...prev, imageUrl: url }))
              }}
              onUploadError={(error: Error) => {
                toast.error(`Upload failed: ${error.message}`);
              }}
              className="w-full"
            />
          )}
        </div>

        <Button type="submit" className="w-full" disabled={updateMutation.isPending}>
          {updateMutation.isPending ? 'Updating...' : 'Update'}
        </Button>
      </form>
    </div>
  )
}
