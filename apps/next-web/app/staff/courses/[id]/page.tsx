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

export default function SubjectForm() {
  const params = useParams()
  const id = params.id
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [materialId, setMaterialId] = useState('')
  const [editData, setEditData] = useState<any>(null)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/subjects', { params: { id: id } })
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

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-semibold mb-4">📚 Subject Overview</h2>

      <div className="p-6 border rounded-2xl shadow-sm space-y-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div><strong>Name:</strong> {data?.subjectName}</div>
          <div><strong>Code:</strong> {data?.subjectCode}</div>
          <div><strong>Year:</strong> {data?.year}</div>
          <div><strong>No. of Credits:</strong> {data?.noOfCredits}</div>
          <div><strong>No. of Hours:</strong> {data?.noOfHours || 'N/A'}</div>
          <div><strong>Exam Type:</strong> {data?.examType}</div>
          <div><strong>Written Type:</strong> {data?.writtenType}</div>
          <div><strong>Is Lab:</strong> {data?.isLab ? 'Yes' : 'No'}</div>
          <div className="sm:col-span-2"><strong>Syllabus:</strong> {data?.syllabus || 'Not Provided'}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10 mb-4 border-b pb-2">
        <h2 className="text-2xl font-semibold">📁 Study Materials</h2>
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
            <EditStydyMaterialForm id={materialId} initialData={editData} refetch={refetch} setOpen={setOpen} />
          ) : (
            <StudyMaterialForm id={id as string} refetch={refetch} />
          )}
        </div>
      )}

      {data?.studyMaterial?.length > 0 &&
        data.studyMaterial.map((material: any, index: number) => (
          <div className="mt-4 border rounded-xl p-4 shadow-sm " key={index}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <File className="w-4 h-4" /> {material?.name}
                </h3>
                <p className="text-sm mt-1 text-gray-600">{material?.description}</p>
                <Link
                  href={material?.url}
                  target="_blank"
                  className="text-blue-600 hover:underline text-sm inline-block mt-2"
                >
                  View Material
                </Link>
              </div>
              <div className="flex gap-2 mt-1">
                <button
                  onClick={() => handleEditFile(material)}
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteStudyMaterial(material?.url, material.id)}
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
