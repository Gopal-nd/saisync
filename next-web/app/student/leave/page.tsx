'use client'

import { ClipboardCopy, NotebookPen } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'
import { leaveTemplates } from '@/lib/leave-templete'



export default function LeaveTemplates() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Leave message copied to clipboard!')
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2">
        <NotebookPen className="w-6 h-6" />
        Leave Application Templates
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {leaveTemplates?.map((template) => (
          <div key={template?.id} className="border rounded-2xl p-5 shadow-sm ">
            <h2 className="text-xl font-semibold mb-1">{template?.title}</h2>
            <p className=" text-sm mb-3">{template?.subject}</p>
            <pre className=" text-sm rounded-md p-3 whitespace-pre-wrap mb-4">{template?.body}</pre>
            <Button
              onClick={() =>redirect(`/student/leave/${template?.id}`)}
              variant="outline"
              className="text-sm"
            >
              Choose
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}


