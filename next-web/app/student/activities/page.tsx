'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { axiosFrontend } from '@/lib/axios'
import { useState } from 'react'
import { Plus, File, Pencil, Trash } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import NewCertificateForm from '@/components/student/activities/certificates/NewCertificate'
import Image from 'next/image'
import EditCertificateForm from '@/components/student/activities/certificates/EditCertificateForm'
import useAuthStore from '@/store/useAuthStore'

export default function Certificates() {
  const id = useAuthStore().user?.id

  const [open, setOpen] = useState(false)
  const [materialId, setMaterialId] = useState('')
  const [editData, setEditData] = useState<any>(null)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['certificate', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students/activities/certificate')
      return res.data.data
    }
  })

  const deleteMaterialMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/api/students/activities/certificate/${id}`)
      return res.data.success
    },
    onSuccess: (success) => {
      if (success) {
        toast.success('File deleted successfully')
        refetch()
      }
    },
    onError: (error: any) => {
      console.error('Study material delete error:', error)
    }
  })

  const handleDeleteStudyMaterial = async (url: string, id: string) => {
    const res = await axiosFrontend.delete('/api/uploadthing', { data: { url } })
    if (res.data?.message === 'ok') {
      deleteMaterialMutation.mutate(id)
    }
  }

  const handleEditFile = (material: any) => {
    setMaterialId(material.id)
    setEditData(material)
    setOpen(true)
  }

  if (isLoading) {
    return <div className="text-center py-10 text-sm text-muted-foreground">Loading...</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mt-10 mb-6 border-b pb-4">
        <h2 className="text-2xl font-semibold">Certificates</h2>
        <Button
          onClick={() => {
            setMaterialId('')
            setEditData(null)
            setOpen((prev) => !prev)
          }}
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>

      {open && (
        <div className="mb-6">
          {materialId ? (
            <EditCertificateForm id={materialId} refetch={refetch} setOpen={setOpen} />
          ) : (
            <NewCertificateForm refetch={refetch} setOpen={setOpen} />
          )}
        </div>
      )}

      {data?.length > 0 ? (
        <div className="space-y-4">
          {data.map((certificate: any, index: number) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <File className="w-4 h-4" /> {certificate?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {certificate?.description}
                  </p>
                </div>
                <div className="flex gap-2 mt-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEditFile(certificate)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleDeleteStudyMaterial(certificate?.imageUrl, certificate.id)
                    }
                  >
                    <Trash className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {certificate?.proofUrl && (
                    <Link
                      href={certificate?.proofUrl}
                      target="_blank"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View Proof
                    </Link>
                  )}
                  <p className="text-sm">Issued By: <strong>{certificate?.issuedBy}</strong></p>
                  <p className="text-sm">Issued Date: {new Date(certificate?.issueDate).toLocaleDateString()}</p>
                  <p className="text-sm">Expiry Date: {new Date(certificate?.expiryDate).toLocaleDateString()}</p>
                </div>
                {certificate?.imageUrl && (
                  <div>
                    <Image
                      src={certificate?.imageUrl}
                      alt="Certificate image"
                      width={300}
                      height={200}
                      className="rounded-lg border shadow-sm"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm text-center mt-10">No certificates found.</p>
      )}
    </div>
  )
}
