'use client';

import axiosInstance from '@/lib/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
    ClockIcon,
    BookIcon,
    UserIcon,
    HashIcon,
    FlaskConicalIcon,
    UsersIcon,
    CalendarIcon,
    Info,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import useAuthStore from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';

const Schedule = () => {
    const { user } = useAuthStore()
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
            <div className="p-4 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-8 w-32" />
            </div>
        );
    }

    if (error) return <div className="p-4">Error loading period details.</div>;

    const Attendence = period.Attendance.filter((a:any) => a.usn === user?.usn)
    return (
        <div className="p-4 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2">
                        <CalendarIcon className="w-5 h-5" />
                        <p>{new Date(period.startTime).toDateString()}</p>
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <BookIcon className="w-5 h-5" />
                        {period.subject} ({period.subjectCode})
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <HashIcon className="w-4 h-4" />
                            Period No: {period.periodNumber}
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
                            Attendance: {Attendence[0].status ==="ABSENT" ? <span className='text-red-500'>Absent</span> :Attendence[0].status ==="PRESENT" ? <span className='text-green-500'>Present</span>: <span className='text-yellow-500'>Not Marked</span>}
                            
                        </div>
                        {
                            period.isLab &&
                            <div className="flex items-center gap-2">
                              <FlaskConicalIcon className="w-4 h-4" />
                              Lab
                            </div>
                        }

                  
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between ">
                        <div className='flex items-center gap-2'>
                        <UsersIcon className="w-5 h-5" />
                        Attendance
                        </div>
                        <Button onClick={() => setShowAttendance(!showAttendance)}>Show List</Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>

                   { showAttendance && <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>USN</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {period.Attendance.map((student: any) => (
                                <TableRow key={student.id} className={student.usn === user?.usn && student.status === "PRESENT" ? "text-green-500" : student.usn === user?.usn && student.status === "ABSENT" ? "text-red-500" : ""}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.usn}</TableCell>
                                    <TableCell>{student.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <      Info className="w-5 h-5" />
                        Additional Info
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                    <p>
                        <span className="font-medium">What was learned:</span>{' '}
                        {period.whatlearned ?? 'Not added yet'}
                    </p>
                    <p>
                        <span className="font-medium">Topics:</span>{' '}
                        {period.topics.length > 0 ? period.topics.join(', ') : 'No topics'}
                    </p>
                </CardContent>
            </Card>

        </div>
    );
};

export default Schedule;
