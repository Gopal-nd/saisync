'use client';

import axiosInstance from '@/lib/axiosInstance';
import { useMutation, useQuery } from '@tanstack/react-query';
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
import React, { useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { string } from 'zod';

const Schedule = () => {
    const { user } = useAuthStore()
    const params = useParams();
    const id = params.id as string;
    const [showAttendance, setShowAttendance] = React.useState(false);
    const [view, setView] = useState(1)

    const {
        data: period,
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['student', id],
        queryFn: async () => {
            if (!id) throw new Error('No ID provided');
            const res = await axiosInstance.get(`/students/class`,{params:{periodId:id}});
            return res.data.data;
        },
    });

    const muttation = useMutation({
        mutationFn:async({userId,periodId,status}:{userId:string,periodId:string,status:string})=>{
            const response = await axiosInstance.put('/students/attendance',{userId,periodId,status})
            console.log(response)
            return response
        },
        onError:(error:any)=>{
            console.log('staff attendence error',error)
        },
        onSuccess:()=>{
            refetch()
        }
    })

    console.log(period)
    if (isLoading) {
        return (
            <div className="p-4 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-8 w-32" />
            </div>
        );
    }

    const handlePresent = (userId:string,periodId:string,status:string)=>{
        muttation.mutate({userId, periodId, status})
    }
    const handleAbsent = (userId:string,periodId:string,status:string)=>{
        muttation.mutate({userId, periodId, status})
    }
    if (error) return <div className="p-4">Error loading period details.</div>;


    return (
        <div className="p-1 space-y-6">
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
                    <CardTitle className="text-md flex items-center gap-2 ">
                        <BookIcon className="w-5 h-5 overflow-hidden" />
                        {period.subject}  ({period.subjectCode})
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
                        <Button onClick={() => setShowAttendance(!showAttendance)}>{showAttendance? 'Hide ':'Take'}</Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>




                   { showAttendance &&
                   <>
                   <div className="flex gap-2">
                    <Button variant={view ==1 ? "outline":'default'} onClick={()=>setView(1)}>
                        Take
                    </Button>
                    <Button variant={view ==2 ? "outline":'default'} onClick={()=>setView(2)}>
                        Present
                    </Button>
                    <Button variant={view ==3 ? "outline":'default'} onClick={()=>setView(3)}>
                        Absent
                    </Button>
                    </div>
                    {
                        view ==1 &&(
                            <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>USN</TableHead>
                                    <TableHead className=''>Present</TableHead>
                                    <TableHead className=''>Absent</TableHead>
    
    
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {period.Attendance.map((student: any) => {

                                    if(student.status!=='NOT_TAKEN') return 
                                    return(
                                        <TableRow key={student.id} className={student.usn === user?.usn && student.status === "PRESENT" ? "text-green-500" : student.usn === user?.usn && student.status === "ABSENT" ? "text-red-500" : ""}>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.usn }</TableCell>
                                        <TableCell><button onClick={()=>handlePresent(student.userId,period.id,'PRESENT')} className='bg-green-400 p-2 rounded-md font-semibold'>Present</button></TableCell>
                                        <TableCell><button onClick={()=>handleAbsent(student.userId,period.id,'ABSENT')} className='bg-red-400 p-2 rounded-md font-semibold'>Absent</button></TableCell>
                                    </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        )
                    }
                     {
                        view ==2 &&(
                            <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>USN</TableHead>
                                    <TableHead className=''>Absent</TableHead>
    
    
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {period.Attendance.map((student: any) => {
                                    if(student.status!=='PRESENT') return 
                                    return(

                                        <TableRow key={student.id} className={student.usn === user?.usn && student.status === "PRESENT" ? "text-green-500" : student.usn === user?.usn && student.status === "ABSENT" ? "text-red-500" : ""}>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.usn }</TableCell>
                                        <TableCell><button onClick={()=>handleAbsent(student.userId,period.id,'ABSENT')} className='bg-red-400 p-2 rounded-md font-semibold'>Absent</button></TableCell>
                                    </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        )
                    } {
                        view ==3 &&(
                            <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>USN</TableHead>
                                    <TableHead className=''>Present</TableHead>

    
    
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {period.Attendance.map((student: any) => {
                                    if(student.status!=='ABSENT') return 

                                    return(
                                        <TableRow key={student.id} className={student.usn === user?.usn && student.status === "PRESENT" ? "text-green-500" : student.usn === user?.usn && student.status === "ABSENT" ? "text-red-500" : ""}>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.usn }</TableCell>
                                        <TableCell><button onClick={()=>handlePresent(student.userId,period.id,'PRESENT')} className='bg-green-400 p-2 rounded-md font-semibold'>Present</button></TableCell>
                                    </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        )
                    }
                 
                   </>
                    
                    }
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

