'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { UploadDropzone } from '@/utils/uploadthing'
import Image from 'next/image'
import { axiosFrontend } from '@/lib/axios'
import axiosInstance from '@/lib/axiosInstance'

export default function NewCertificateForm({refetch,setOpen}: {refetch: () => void,setOpen: (open: boolean) => void}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 1,
    issuedBy: '',
    issueDate: '',
    expiryDate: '',
    imageUrl: '',
    proofUrl: '', // Added proof URL
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.imageUrl) {
      toast.error('Please upload an image')
      return
    }

    const certificateData = {
      ...formData, // Spread the entire formData object
    }

    try {
      setLoading(true)
      await axiosInstance.post('/api/students/activities/certificate/new', certificateData)
      setLoading(false)
      toast.success('Certificate uploaded successfully')
      refetch()
      setOpen(false)
      setFormData({
        title: '',
        description: '',
        duration: 1,
        issuedBy: '',
        issueDate: '',
        expiryDate: '',
        imageUrl: '',
        proofUrl: '',
      })
    } catch (error) {
      setLoading(false)
      toast.error('Failed to upload certificate')
    }
  }

  const handleDeleteFile = async () => {
    const res = await axiosFrontend.delete('/api/uploadthing', { data: { url: formData.imageUrl } })
    console.log(res.data)
    if (res.data?.message === 'ok') {
      toast.success('Image deleted successfully')
    }
    return true
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-6">Upload Certificate</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
          <Input
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter certificate title"
            required
            className="mt-1"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter certificate description"
            className="mt-1"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <label htmlFor="duration" className="text-sm font-medium text-gray-700">Duration (in months)</label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={handleChange}
            min={1}
            required
            className="mt-1"
          />
        </div>

        {/* Issued By */}
        <div className="flex flex-col">
          <label htmlFor="issuedBy" className="text-sm font-medium text-gray-700">Issued By</label>
          <Input
            id="issuedBy"
            value={formData.issuedBy}
            onChange={handleChange}
            placeholder="Enter organization or institution"
            required
            className="mt-1"
          />
        </div>

        {/* Issue Date */}
        <div className="flex flex-col">
          <label htmlFor="issueDate" className="text-sm font-medium text-gray-700">Issue Date</label>
          <Input
            id="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        {/* Expiry Date */}
        <div className="flex flex-col">
          <label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">Expiry Date (optional)</label>
          <Input
            id="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        {/* Image Upload */}
        <div className="flex flex-col">
          {formData.imageUrl ? (
            <>
              <Image src={formData.imageUrl} alt="Uploaded Certificate" width={200} height={200} className='object-cover' />
              <Button onClick={handleDeleteFile} className='bg-red-500 hover:bg-red-700'>Delete</Button>
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
                const url = res[0].ufsUrl
                setFormData((prev) => ({ ...prev, imageUrl: url }))
              }}
              onUploadError={(error: Error) => {
                console.error(`Upload failed: ${error.message}`)
              }}
            />
          )}
        </div>

        {/* Proof URL */}
        <div className="flex flex-col">
          <label htmlFor="proofUrl" className="text-sm font-medium text-gray-700">Proof URL (optional)</label>
          <Input
            id="proofUrl"
            value={formData.proofUrl}
            onChange={handleChange}
            placeholder="Enter proof URL"
            className="mt-1"
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </Button>
      </form>
    </div>
  )
}
