"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { SemesterData } from "@/lib/calculator"
import { toast } from "sonner"

interface SemesterCalculatorProps {
  semesterNumber: number
  semesterData: SemesterData
}

export function SemesterCalculator({ semesterNumber, semesterData }: SemesterCalculatorProps) {
  const [marks, setMarks] = useState<Record<number, string>>({})
  const [sgpa, setSgpa] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (index: number, value: string) => {
    if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) {
      setMarks({ ...marks, [index]: value })
      setError(null)
    }
  }

  const calculateSGPA = () => {
    setError(null)
    setSuccess(false)

    // Check if all inputs are filled
    const allSubjectsHaveMarks = semesterData.subjects.every(
      (_, index) => marks[index] !== undefined && marks[index] !== "",
    )

    if (!allSubjectsHaveMarks) {
      toast.error("Please enter marks for all subjects")
      return
    }

    // Check if all marks are valid
    const allMarksValid = Object.values(marks).every((mark) => Number(mark) >= 0 && Number(mark) <= 100)

    if (!allMarksValid) {
      toast.error("Marks should be between 0 and 100")
      return
    }

    let sum = 0

    semesterData.subjects.forEach((subject, index) => {
      const mark = Number(marks[index])
      const credits = subject.credits

      let gradePoints = 0

      if (mark >= 90) {
        gradePoints = 10
      } else if (mark >= 80) {
        gradePoints = 9
      } else if (mark >= 70) {
        gradePoints = 8
      } else if (mark >= 60) {
        gradePoints = 7
      } else if (mark >= 50) {
        gradePoints = 6
      } else if (mark >= 45) {
        gradePoints = 5
      } else if (mark >= 40) {
        gradePoints = 4
      } else {
        gradePoints = 0
      }

      sum += credits * gradePoints
    })

    const calculatedSGPA = sum / semesterData.totalCredits
    setSgpa(calculatedSGPA)
    setSuccess(true)
    
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const resetForm = () => {
    setMarks({})
    setSgpa(null)
    setError(null)
    setSuccess(false)
  }
  


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">
          2022 Scheme <span className="text-foreground">{semesterData.title}</span> Calculator
        </h1>
        <p className="text-muted-foreground mt-2">Enter your marks (0-100) for each subject to calculate your SGPA</p>
      </div>
      <div className="space-y-4 mb-8 w-full max-w-2xl mx-auto">
  {semesterData.subjects.map((subject, index) => (
    <Card
      key={index}
      className={cn(
        "transition-all duration-200 p-4 border",
        index % 2 === 0 ? "bg-card" : "bg-muted/50"
      )}
    >
      <CardContent className="p-0">
        <Label
          htmlFor={`subject-${index}`}
          className="text-base font-medium mb-2 block"
        >
          {subject.name}
        </Label>
        <Input
          id={`subject-${index}`}
          type="number"
          placeholder={subject.placeholder}
          min="0"
          max="100"
          value={marks[index] || ""}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="text-base"
        />
      </CardContent>
    </Card>
  ))}
</div>


      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
        <Button onClick={calculateSGPA} size="lg" className="px-8">
          Calculate SGPA
        </Button>
        <Button onClick={resetForm} variant="outline" size="lg">
          Reset Form
        </Button>
      </div>

      {sgpa !== null && (
        <div ref={resultRef} className="mt-8 mb-12 transition-all duration-500 ease-in-out">
          <Card className="max-w-md mx-auto border-primary/50 shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                Result
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center py-6">
              <div className="text-4xl font-bold text-primary mb-2">{sgpa.toFixed(2)}</div>
              <p className="text-muted-foreground">Your Semester {semesterNumber} SGPA</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
