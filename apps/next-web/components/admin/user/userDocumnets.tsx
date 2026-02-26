'use client'

import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { UploadDropzone } from '@/utils/uploadthing'
import { axiosFrontend } from '@/lib/axios'

export default function UserDocuments({ id }: { id: string }) {
  const [initialUrls, setInitialUrls] = useState<any>({})
  const [urls, setUrls] = useState({
    aadharCard: '',
    entrenceExamCert: '',
    fatherPhoto: '',
    marksheet10: '',
    marksheet12: '',
    motherPhoto: '',
    panCard: '',
    photo: '',
    seblingPhoto: '',
    transferCert: '',
  })

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['documents', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students/documents', { params: { id } })
      return res.data
    },
  })

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.put('/api/students/documents', {
        ...urls,
        id,
      })
      return res.data
    },
    onSuccess: (res) => {
      toast.success(res.message || 'Documents updated successfully')
      refetch()
    },
    onError: () => toast.error('Failed to upload documents'),
  })

  const onSubmit = () => {
    mutation.mutate()
  }

  useEffect(() => {
    if (data) {
      const docData = {
        aadharCard: data.data.aadharCard,
        entrenceExamCert: data.data.entrenceExamCert,
        fatherPhoto: data.data.fatherPhoto,
        marksheet10: data.data.marksheet10,
        marksheet12: data.data.marksheet12,
        motherPhoto: data.data.motherPhoto,
        panCard: data.data.panCard,
        photo: data.data.photo,
        seblingPhoto: data.data.seblingPhoto,
        transferCert: data.data.transferCert,
      }
      setUrls(docData)
      setInitialUrls(docData)
    }
  }, [data])

  const handleDelete = async (key: string, url: string) => {
    try {
      await axiosFrontend.delete('/api/uploadthing', { data: { url } })
      setUrls((prevUrls) => ({
        ...prevUrls,
        [key]: '',
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const isChanged = JSON.stringify(initialUrls) !== JSON.stringify(urls)

  if (isLoading) return <div className="text-center py-10">Loading...</div>

  return (
    <main className="min-h-screen p-10 flex flex-col items-center gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {Object.entries(urls).map(([key, value]) => (
          <div key={key} className="p-4 border rounded-2xl shadow-sm flex flex-col items-center gap-4 ">
            <h1 className="text-base font-semibold capitalize text-center">{key}</h1>
            {value ? (
              <>
                <img src={value} alt={key} className="w-full h-40 object-cover rounded-lg border" />
                <Button onClick={() => handleDelete(key, value)} variant="destructive" className="w-full">
                  Delete
                </Button>
              </>
            ) : (
              <UploadDropzone
                endpoint="imageUploader"
                appearance={{
                  label: "text-sm text-gray-500",
                  allowedContent: "text-xs text-muted-foreground",
                }}
                className="w-full"
                onClientUploadComplete={(res) => {
                  const uploadedUrl = res[0].ufsUrl
                  setUrls((prev) => ({ ...prev, [key]: uploadedUrl }))
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`)
                }}
              />
            )}
          </div>
        ))}
      </div>

      <Button
        onClick={onSubmit}
        className="px-8 py-2 text-lg"
        disabled={!isChanged || mutation.isPending}
      >
        {mutation.isPending ? 'Saving...' : 'Submit'}
      </Button>
    </main>
  )
}
