import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">2022 Scheme SGPA Calculator</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Calculate your Semester Grade Point Average (SGPA) easily for all semesters with our intuitive calculator.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
          <Card key={sem} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle>Semester {sem}</CardTitle>
              <CardDescription>2022 Scheme</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Calculate your SGPA for semester {sem} based on the 2022 curriculum scheme.
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/student/tools/${sem}`} className="w-full">
                <Button className="w-full">Calculate</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="max-w-3xl mx-auto text-muted-foreground">
          <p className="mb-4">
            Enter your marks for each subject, and our calculator will automatically compute your SGPA based on the 2022
            scheme grading system.
          </p>
          <p>
            The calculator takes into account the credit weightage of each subject and applies the appropriate grade
            points based on your marks.
          </p>
        </div>
      </div>
    </div>
  )
}
