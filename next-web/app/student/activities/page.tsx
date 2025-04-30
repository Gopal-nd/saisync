'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { axiosFrontend } from '@/lib/axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Plus, File, Pencil, Trash } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import StudyMaterialForm from '@/components/courses/StudyMaterialForm'
import EditStydyMaterialForm from '@/components/courses/EditStudyMetrialForm'
import NewCertificateForm from '@/components/student/activities/certificates/NewCertificate'
import Image from 'next/image'
import EditCertificateForm from '@/components/student/activities/certificates/EditCertificateForm'

export default function SubjectForm() {
  const params = useParams()
  const id = params.id
  const router = useRouter()

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
      const res = await axiosInstance.delete(`/api/study-materials/material/${id}`)
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
    return <div className="text-center py-10 text-sm">Loading...</div>
  }

  console.log(data)

  return (
    <div className="max-w-3xl mx-auto  p-2">
    

      <div className="flex items-center justify-between mt-10 mb-4 border-b pb-2">
        <h2 className="text-2xl font-semibold">Certificate</h2>
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
        <div className="mt-4">
          {materialId ? (
            <EditCertificateForm id={materialId} refetch={refetch} setOpen={setOpen} />
          ) : (
            <NewCertificateForm  refetch={refetch} setOpen={setOpen} />
          )}
        </div>
      )}
      {/* <p>{JSON.stringify(data, null, 5)}</p> */}

      {data?.length > 0 &&
        data.map((certificate: any, index: number) => (
          <div className="mt-4 border rounded-xl p-4 shadow-sm " key={index}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <File className="w-4 h-4" /> {certificate?.title}
                </h3>
                <p className="text-sm mt-1 text-gray-600">{certificate?.description}</p>
                <Image src={certificate?.imageUrl} alt="" width={200} height={200}/>
                {certificate.proofUrl && <Link
                  href={certificate?.proofUrl}
                  target="_blank"
                  className="text-blue-600 hover:underline text-sm inline-block mt-2"
                >
                  View Proof
                </Link>}
              </div>
              <div className='flex flex-col'>

              <p>IssuedBy: {certificate?.issuedBy}</p>
              <p>IssuedDate: {new Date(certificate?.issueDate).toLocaleDateString()}</p>
              <p>ExpireDate:{new Date(certificate?.expiryDate).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleEditFile(certificate)}
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteStudyMaterial(certificate?.imageUrl, certificate.id)}
                  className="text-gray-600 hover:text-red-600 transition"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
