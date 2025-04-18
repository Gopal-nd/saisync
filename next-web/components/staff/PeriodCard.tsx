

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { ChevronDownIcon, ChevronUpIcon, BookOpenIcon, ClockIcon, HashIcon, UsersIcon, UserIcon } from 'lucide-react'
import axiosInstance from '@/lib/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

interface PeriodCardProps {
  period: {
    id: string
    subject: string
    startTime: string
    endTime: string
    subjectCode: string
    isLab: boolean
  }
  branchName: string
  semesterNumber: string
  periodId: string
  day: string
  section: string
}

const PeriodCard: React.FC<PeriodCardProps> = ({
  period,
  branchName,
  semesterNumber,
  periodId,
  section,
}) => {
  const [open, setOpen] = useState(false)

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['students', periodId],
    queryFn: async () => {
      const res = await axiosInstance.get('/students/attendance/absent', {
        params: {  periodId, },
      })
      return res.data.data
    },
    enabled: false,
  })


  useEffect(() => {
    if (open) refetch()
  }, [open, refetch])

  const inProgress = Date.now() > new Date(period.startTime).getTime() && Date.now() < new Date(period.endTime).getTime()

  return (
    <Card className={`hover:shadow-lg transition-shadow ${inProgress ? 'border-green-500':''}`}>
      <CardHeader className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <BookOpenIcon className="w-5 h-5" />
          <CardTitle className="text-lg">{period.subject}</CardTitle>
        </div>
        <Badge variant={period.isLab ? 'destructive' : 'secondary'}>
          {period.isLab ? 'Lab' : 'Theory'}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-1">
            <UsersIcon className="w-4 h-4" /> {branchName} | {semesterNumber} | {section}
          </div>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <HashIcon className="w-4 h-4" /> {period.subjectCode}
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />{' '}
            {new Date(period.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {' — '}
            {new Date(period.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen((o) => !o)}
          className="w-full flex justify-between"
        >
          {open ? 'Hide Absenties' : 'Show Absenties'}
          {open ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
        </Button>

        {open && (
          <>
          {data && data.length === 0 ? <p className="text-center text-sm">No Absenties</p>:<>
            <Separator className="my-2" />
            {isLoading && <p className="text-center text-sm">Loading students…</p>}
            {isError && <p className="text-center text-sm text-red-600">Error loading students</p>}
            {data && (
              <Table className="text-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>USN</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data && data.map((stu:any) => (
                    <TableRow key={stu.id}>
                      <TableCell className="flex items-center gap-1">
                        <UserIcon className="w-4 h-4" />
                        {stu.name}
                      </TableCell>
                      <TableCell>{stu.usn}</TableCell>
                      <TableCell>
                        <Badge variant={stu.status === 'PRESENT' ? 'secondary' : 'destructive'}>
                          {stu.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
          }
          </>
        )}
      </CardContent>

        <Link href={`/staff/${periodId}`} passHref>
      <CardFooter className="flex justify-between">
          <Button variant="ghost" size="sm">
            View Details
          </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            toast.success('Attendance modal coming soon!')
          }}
          >
          Take Attendance
        </Button>
      </CardFooter>
          </Link>
    </Card>
  )
}

export default PeriodCard
