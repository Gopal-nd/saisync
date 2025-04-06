'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import axiosInstance from '@/lib/axiosInstance'

interface UploadImageProps {
  label: string
  name: string
  value: string | null
  onChange: (url: string | null) => void
}

export default function UploadImage({ label, name, value, onChange }: UploadImageProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      setUploading(true)
      const res = await axiosInstance.post('/api/upload', formData)
      const url = res.data?.url
      if (url) {
        onChange(url)
        toast.success('Image uploaded!')
      } else {
        toast.error('Upload failed')
      }
    } catch (error) {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {!value && (
        <Input type="file" accept="image/*" name={name} onChange={handleFileChange} disabled={uploading} />
      )}
      {value && (
        <div className="relative group">
          <img
            src={value}
            alt={label}
            className="w-full h-48 object-cover rounded-md border shadow"
          />
          <Button
            type="button"
            variant="destructive"
            className="absolute top-2 right-2 text-xs px-2 py-1"
            onClick={() => onChange(null)}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}
