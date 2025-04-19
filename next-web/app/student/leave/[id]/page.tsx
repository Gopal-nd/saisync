'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { leaveTemplates } from "@/lib/leave-templete"
import useAuthStore from "@/store/useAuthStore"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { GoogleGenAI, Type } from "@google/genai"

const LeaveTemplete = () => {
  const params = useParams()
  const id = Number(params.id)
  const { user } = useAuthStore()

  const leave = leaveTemplates.find((leave) => leave.id === id)
console.log(user)
  const [from, setFrom] = useState(user?.email || "")
  const [to, setTo] = useState(user?.mentor || "")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [addMoreContext, setAddMoreContext] = useState(false)
  const [extraContext, setExtraContext] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (leave) {
      setSubject(`${leave.subject} - Leave Request`)
      setBody(leave.body)
    }
  }, [leave])

  const handleSend = () => {
    if(!to) {
      setError("To field cannot be empty.")
      return
    }
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  })

  const aiResponse = async () => {
    if (!subject || !body) {
      setError("Subject and body cannot be empty.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `
The user has drafted the following leave email.

Subject: ${subject}

Body:
${body}

${addMoreContext && extraContext ? `Additional context from the user: ${extraContext}` : ""}

Using this context and the user info below, generate a formal college leave request email.

User Info:
${JSON.stringify(user)}
Date: ${new Date().toISOString()}

Respond in JSON format:
{
  "subject": string,
  "body": string
}
`,
        config: {
          temperature: 0.9,
          maxOutputTokens: 500,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              subject: {
                type: Type.STRING,
                description: 'The subject of the email',
                nullable: false,
              },
              body: {
                type: Type.STRING,
                description: 'The body of the email',
                nullable: false,
              },
            },
            required: ['subject', 'body'],
          },
        },
      })

      const rawText = response.text
      console.log(rawText)
      if (!rawText) throw new Error("Empty response from AI.")

      const parsed = JSON.parse(rawText)
      if (!parsed.body || !parsed.subject) {
        throw new Error("Invalid AI response structure.")
      }

      setSubject(parsed.subject)
      setBody(parsed.body)
    } catch (err: any) {
      console.error("AI error:", err)
      setError("Failed to generate email. Please try again.")
    } finally {
        setAddMoreContext(false)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow-sm space-y-6">
      <h2 className="text-2xl font-semibold">{leave?.title || "Leave"} Email Request</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">From</label>
          <Input value={from} onChange={(e) => setFrom(e.target.value)} disabled />
        </div>

        <div>
          <label className="text-sm font-medium">To</label>
          <Input value={to} onChange={(e) => setTo(e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-medium">Subject</label>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-medium">Body</label>
          <Textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="resize-none"
          />
        </div>

        <div className="space-x-2 flex items-center">
          <input
            type="checkbox"
            checked={addMoreContext}
            onChange={(e) => setAddMoreContext(e.target.checked)}
            className="w-4 h-4"
          />
          <label className="text-sm">Add more context for better response</label>
        </div>

        {addMoreContext && (
          <div>
            <label className="text-sm font-medium">Extra Context</label>
            <Textarea
              placeholder="e.g., I have a medical appointment, or I'm going to attend a family function..."
              rows={3}
              value={extraContext}
              onChange={(e) => setExtraContext(e.target.value)}
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={aiResponse} className="w-full" disabled={loading}>
          {loading ? "Generating..." : "Generate Email"}
        </Button>

        <Button onClick={handleSend} className="w-full">
          Send Mail
        </Button>
      </div>
    </div>
  )
}

export default LeaveTemplete
