'use client';

import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'sonner';

const branches = ['AIML', 'ECE', 'CSE', 'EEE', 'ISE', 'MECH'];
const semesters = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];
const sections = ['A', 'B', 'C'];

const fetchMarks = async (
    branch: string,
    section: string,
    semester: string,
    subjectCode: string,
    testNo: string
) => {
    const response = await axiosInstance.get('/api/iaexam', {
        params: { branch, section, semester, subjectCode, testNo, limit: 10 },
    });
    return response.data;
};

const IATests = () => {
    const [subjectCode, setSubjectCode] = useState('');
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [section, setSection] = useState('');
    const [testNo, settestNo] = useState('');

    const [marksMap, setMarksMap] = useState<{ [studentId: string]: number }>({});

    const handleMarkChange = (studentId: string, value: string) => {
        setMarksMap((prev) => ({
            ...prev,
            [studentId]: parseInt(value) || 0,
        }));
    };


    const { data: subjectCodes, isLoading: subjectCodesLoading } = useQuery({
        queryKey: ['subjectCodes'],
        queryFn: async () => {
            const res = await axiosInstance.get('/subjects');
            return res.data.data;
        },
    });

    const mutate = useMutation({
        mutationFn: async (data:{id:string,marks:number}) => {
            const res = await axiosInstance.put('/api/iaexam/edit', data)
            return res.data
        },

        onSuccess: (data) => {
            console.log(data)
            toast.success(data?.message)
            refetch()
        },
        onError: (error:any) => {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Something went wrong')
        }
    })

    const isSelectedAll =
        subjectCode && branch && section && semester && testNo;

    const allowed = !!isSelectedAll
    console.log(allowed)

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['ia-marks', branch, semester, section, subjectCode, testNo],
        queryFn: () => fetchMarks(branch, section, semester, subjectCode, testNo),
        enabled: false,
    });

    data && console.log(data)

    const saveMarks = (studentId: string) => {
        const marks = marksMap[studentId] || 0;
        console.log('Saving', studentId, marks);
        const data ={id:studentId, marks}
        if(data.marks >=51) return
        mutate.mutate(data)

    };
    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-row items-center justify-between m-2">
                <p className="text-2xl font-bold mb-4">Select A Subject To Add Marks</p>
            </div>

            {/* Select Filters */}
            <div className="flex gap-4 mb-6 flex-wrap">
                <Select onValueChange={setSubjectCode}>
                    <SelectTrigger className="w-full md:w-52">
                        <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        {subjectCodes?.map((subject: any) => (
                            <SelectItem key={subject?.id} value={subject?.subjectCode}>
                                {subject?.subjectCode} - {subject?.subjectName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={setBranch}>
                    <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                        {branches.map((b) => (
                            <SelectItem key={b} value={b}>
                                {b}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={setSemester}>
                    <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                        {semesters.map((s) => (
                            <SelectItem key={s} value={s}>
                                {s}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={setSection}>
                    <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Select Section" />
                    </SelectTrigger>
                    <SelectContent>
                        {sections.map((s) => (
                            <SelectItem key={s} value={s}>
                                {s}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={settestNo}>
                    <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Select Exam" />
                    </SelectTrigger>
                    <SelectContent>
                        {['IA_1', 'IA_2', 'IA_3'].map((e) => (
                            <SelectItem key={e} value={e}>
                                {e}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Button disabled={!allowed} onClick={() => refetch()}>
                Fetch Results
            </Button>

            {/* Results */}
            {isLoading ? (
                <p>Loading results...</p>
            ) : isError ? (
                <p className="text-red-500">Failed to fetch data. Please try again.</p>
            ) : data?.data?.students?.length === 0 ? (
                <p className="text-center text-gray-600">No Results Found</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>USN</TableHead>
                            <TableHead>Obtained</TableHead>
                            <TableHead>Max Marks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.data?.map((student: any, index: number) => (
                            <TableRow
                                key={index}
                                className="cursor-pointer "
                                onClick={() => console.log(index)}
                            >
                                <TableCell>{student?.user?.name}</TableCell>
                                <TableCell>{student?.user?.usn ?? '-'}</TableCell>
                                <TableCell className='max-w-1 flex justify-between items-center'>
                                    <Input
                                        type="number"
                                        className="min-w-[100px]"
                                        min={0}
                                        max={50}
                                        value={marksMap[student.id] ?? student.obtainedMarks ?? 0}
                                        onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                    />
                                    <Button variant="outline" onClick={() => saveMarks(student.id)}
                                          disabled={
                                            marksMap[student.id] === undefined || 
                                            marksMap[student.id] === student.obtainedMarks
                                          }>
                                        Save
                                    </Button>
                                </TableCell>
                                <TableCell>{student?.totalMarks ?? '-'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default IATests;
