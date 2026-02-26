'use client'

import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/lib/axiosInstance'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const documentLabels: Record<string, string> = {
  aadharCard: 'Aadhar Card',
  marksheet10: '10th Marksheet',
  marksheet12: '12th Marksheet',
  transferCert: 'Transfer Certificate',
  photo: 'Student Photo',
  panCard: 'PAN Card',
  motherPhoto: 'Mother Photo',
  fatherPhoto: 'Father Photo',
  seblingPhoto: 'Sibling Photo',
  entrenceExamCert: 'Entrance Exam Certificate',
}

export default function UserDocuments({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ['documents', id],
    queryFn: async () => {
      const res = await axiosInstance.get('/api/students/documents', {
        params: { id },
      })
      return res.data.data
    },
  })

  if (isLoading) return <div className="text-center py-10">Loading...</div>

  return (
    <main className="min-h-screen p-6">
      <h2 className="text-2xl font-semibold text-center mb-8">📁 Uploaded Documents</h2>

      <ScrollArea className="w-full">
        <div className="flex w-max gap-6 px-1 pb-4">
          {Object.entries(documentLabels).map(([key, label], idx) => {
            const fileUrl = data?.[key]

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="w-[250px] rounded-2xl shadow-md hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-base">{label}</CardTitle>
                    <CardDescription className="text-xs">
                      {fileUrl ? 'Uploaded' : 'Not Uploaded'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center gap-4">
                    {fileUrl ? (
                      <>
                        <div className="w-full h-36 relative rounded-lg overflow-hidden border">
                          <Image
                            src={fileUrl}
                            alt={label}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                        <Link href={fileUrl} target="_blank" download>
                          <Button variant="outline" size="sm" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <p className="text-sm text-red-500">No file</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </main>
  )
}
