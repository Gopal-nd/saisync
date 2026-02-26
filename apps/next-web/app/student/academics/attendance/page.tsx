'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axiosInstance from '@/lib/axiosInstance'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import {
  format,
  eachDayOfInterval,
  parseISO,
  isValid,
} from 'date-fns'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type AttendanceRecord = {
  user: {
    name: string
    usn: string
  }
  periodNumber: number
  status: 'PRESENT' | 'ABSENT'
  date: string
  period: {
    subject: string
    subjectCode: string
    staff: string
  }
}

const Attendance = () => {
  const [date, setDate] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  })

  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState<AttendanceRecord | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const mutation = useMutation({
    mutationFn: async (date: { startDate: string; endDate: string }) => {
      const res = await axiosInstance.post('/api/attendence/student', date)
      return res.data.data as AttendanceRecord[]
    },
    onSuccess: (data) => {
      setAttendanceData(data)
    }
  })

  const handleSubmit = () => {
    if (!date.startDate || !date.endDate) return
    mutation.mutate(date)
  }

  const dateList =
    date.startDate && date.endDate
      ? eachDayOfInterval({
          start: new Date(date.startDate),
          end: new Date(date.endDate),
        })
      : []

  const groupedData: Record<string, Record<number, AttendanceRecord>> = {}

  attendanceData.forEach((record) => {
    const formattedDate = format(new Date(record.date), 'yyyy-MM-dd')
    if (!groupedData[formattedDate]) groupedData[formattedDate] = {}
    groupedData[formattedDate][record.periodNumber] = record
  })

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        <h1 className="text-xl font-bold">Attendance</h1>

        {/* Date Range Inputs */}
        <div className="flex items-center gap-4">
          <Input
            type="date"
            value={date.startDate}
            onChange={(e) => setDate({ ...date, startDate: e.target.value })}
          />
          <Input
            type="date"
            value={date.endDate}
            onChange={(e) => setDate({ ...date, endDate: e.target.value })}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>

        {/* Attendance Table */}
        {dateList.length > 0 && (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  {[...Array(8)].map((_, i) => (
                    <TableHead key={i}>Period {i + 1}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {dateList.map((dateObj) => {
                  const formattedDate = format(dateObj, 'yyyy-MM-dd')
                  const dayOfWeek = format(dateObj, 'EEEE') // Monday, Tuesday, etc.
                  const periods = groupedData[formattedDate] || {}

                  return (
                    <TableRow key={formattedDate}>
                      <TableCell>
                        {formattedDate} <br className="sm:hidden" /> ({dayOfWeek})
                      </TableCell>

                      {[...Array(8)].map((_, i) => {
                        const record = periods[i + 1]
                        const status = record?.status

                        return (
                          <TableCell
                            key={i}
                            className={`text-center cursor-pointer font-medium ${
                              status === 'PRESENT'
                                ? 'text-green-600'
                                : status === 'ABSENT'
                                ? 'text-red-600'
                                : 'text-gray-400'
                            }`}
                            onClick={() => {
                              if (record) {
                                setSelectedPeriod(record)
                                setOpenModal(true)
                              }
                            }}
                          >
                            {record ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span>
                                    {status === 'PRESENT' && '✓'}
                                    {status === 'ABSENT' && '✗'}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {record.period.subject} - {record.period.staff} (
                                    {record.period.subjectCode})
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              '--'
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Modal Dialog */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Period Details</DialogTitle>
            </DialogHeader>
            {selectedPeriod && (
              <div className="space-y-2 text-sm">
                <p><strong>Date:</strong> {format(new Date(selectedPeriod.date), 'yyyy-MM-dd')}</p>
                <p><strong>Day:</strong> {format(new Date(selectedPeriod.date), 'EEEE')}</p>
                <p><strong>Period Number:</strong> {selectedPeriod.periodNumber}</p>
                <p><strong>Status:</strong> {selectedPeriod.status}</p>
                <p><strong>Subject:</strong> {selectedPeriod.period.subject}</p>
                <p><strong>Staff:</strong> {selectedPeriod.period.staff}</p>
                <p><strong>Subject Code:</strong> {selectedPeriod.period.subjectCode}</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default Attendance
