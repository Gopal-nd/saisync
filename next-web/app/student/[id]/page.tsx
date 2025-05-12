'use client';

import axiosInstance from '@/lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  CalendarIcon,
  BookIcon,
  UserIcon,
  HashIcon,
  FlaskConicalIcon,
  UsersIcon,
  ClockIcon,
  Info,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import React from 'react';
import useAuthStore from '@/store/useAuthStore';

const Schedule = () => {
  const { user } = useAuthStore();
  const params = useParams();
  const id = params.id as string;
  const [showAttendance, setShowAttendance] = React.useState(false);

  const {
    data: period,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      if (!id) throw new Error('No ID provided');
      const res = await axiosInstance.get(`/api/schedule/one/${id}`);
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-4xl mx-auto">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-8 w-32" />
      </div>
    );
  }

  if (error) return <div className="p-6 text-center text-red-500">Error loading period details.</div>;

  const attendance = period.Attendance.filter((a: any) => a.usn === user?.usn);
  const studentStatus = attendance[0]?.status;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto text-sm">
      {/* Date Card */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <CalendarIcon className="w-5 h-5" />
            {new Date(period.startTime).toDateString()}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Period Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 font-semibold">
            <BookIcon className="w-5 h-5" />
            {period.subject} ({period.subjectCode})
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-2">
            <HashIcon className="w-4 h-4" />
            <span>Period No: {period.periodNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            Start: {new Date(period.startTime).toLocaleTimeString()}
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 rotate-180" />
            End: {new Date(period.endTime).toLocaleTimeString()}
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            Staff: {period.staff}
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            Attendance:
            {studentStatus === 'PRESENT' && <span className="text-green-600 font-medium">Present</span>}
            {studentStatus === 'ABSENT' && <span className="text-red-500 font-medium">Absent</span>}
            {!studentStatus && <span className="text-yellow-500 font-medium">Not Marked</span>}
          </div>
          {period.isLab && (
            <div className="flex items-center gap-2">
              <FlaskConicalIcon className="w-4 h-4" />
              Lab Session
            </div>
          )}
        </CardContent>
      </Card>

      {/* Attendance List */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 font-semibold text-base">
            <UsersIcon className="w-5 h-5" />
            Full Attendance
          </CardTitle>
          <Button size="sm" variant="outline" onClick={() => setShowAttendance(!showAttendance)}>
            {showAttendance ? 'Hide List' : 'Show List'}
          </Button>
        </CardHeader>
        {showAttendance && (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>USN</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {period.Attendance.map((student: any) => (
                  <TableRow
                    key={student.id}
                    className={
                      student.usn === user?.usn
                        ? student.status === 'PRESENT'
                          ? 'text-green-600'
                          : student.status === 'ABSENT'
                          ? 'text-red-500'
                          : ''
                        : ''
                    }
                  >
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.usn}</TableCell>
                    <TableCell>{student.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Info className="w-5 h-5" />
            Additional Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <span className="font-medium">What was learned:</span>{' '}
            {period.whatlearned ?? <span className="text-muted-foreground">Not added yet</span>}
          </p>
          <p>
            <span className="font-medium">Topics:</span>{' '}
            {period.topics.length > 0 ? period.topics.join(', ') : <span className="text-muted-foreground">No topics</span>}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;
