'use client'
import { SemesterCalculator } from "@/components/semester-calculator"
import { semesterData } from "@/lib/calculator"
import { notFound, useParams } from "next/navigation"

export default function SemesterPage(){
  const params = useParams()
  const semesterId = Number(params.id)

  // Check if the semester ID is valid
  if (isNaN(semesterId) || semesterId < 1 || semesterId > 8 || !semesterData[semesterId]) {
    notFound()
  }

  return <SemesterCalculator semesterNumber={semesterId} semesterData={semesterData[semesterId]} />
}
