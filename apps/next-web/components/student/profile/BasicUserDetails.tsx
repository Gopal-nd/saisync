'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import { Badge } from '@/components/ui/badge'

const BasicUserDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students', { params: { id } })
      return res.data.data
    }
  })

  if (isLoading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="p-6 max-w-3xl mx-auto shadow-lg border rounded-2xl mt-10 bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-bold mb-6 text-center">👤 Student Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name" value={data.name} />
        <Field label="Email" value={data.email} />
        <Field label="USN" value={data.usn} />
        <Field label="College ID" value={data.collageId} />
        <Field label="Section" value={data.section} />
        <Field label="Semester" value={data.semester} />
        <Field label="Branch" value={data.branch} />
        <Field label="Lab Batch" value={data.labBatch || 'N/A'} />
        <Field label="Schema" value={data.schema} />
        <Field label="Role" value={<Badge>{data.role}</Badge>} />
        <Field label="Verified" value={data.isVerified ? '✅ Yes' : '❌ No'} />
      </div>

      {data.mentor && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">🎓 Mentor</h3>
          <p><span className="font-medium">Name:</span> {data.mentor.name}</p>
          <p><span className="font-medium">Email:</span> {data.mentor.email}</p>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>Account created: {new Date(data.createdAt).toLocaleString()}</p>
        <p>Last updated: {new Date(data.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  )
}

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg shadow-sm">
    <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">{value}</p>
  </div>
)

export default BasicUserDetails
