
import { SemesterCalculator } from "@/components/semester-calculator"
import { semesterData } from "@/lib/calculator"
import { notFound } from "next/navigation"

export default function SemesterPage({ params }: { params: { id: string } }) {
  const semesterId = Number.parseInt(params.id)

  // Check if the semester ID is valid
  if (isNaN(semesterId) || semesterId < 1 || semesterId > 8 || !semesterData[semesterId]) {
    notFound()
  }

  return <SemesterCalculator semesterNumber={semesterId} semesterData={semesterData[semesterId]} />
}

// Generate static params for all semesters
export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({
    id: id.toString(),
  }))
}
