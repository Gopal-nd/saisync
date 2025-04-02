'use client'
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { debounce } from 'lodash';
import axiosInstance from '@/lib/axiosInstance';
import {Edit, Trash2,Plus} from 'lucide-react'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';


const branches = ['AIML', 'ECE', 'CSE', 'EEE', 'ISE', 'MECH'];
const semesters = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];

const fetchSubjects = async (query: string, branch: string, semester: string, page: number) => {
  const response = await axiosInstance.get('/api/subjects/search', {
    params: { query, branch, semester, page, limit: 10 },
  });
  return response.data;
};

const SearchPage = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [page, setPage] = useState(1);
  
  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 700);

  const { data, isLoading,refetch } = useQuery({
    queryKey: ['subjects', searchTerm, branch, semester, page],
    queryFn: () => fetchSubjects(searchTerm, branch, semester, page),

  });
  const mutate = useMutation({
    mutationFn: async (id: string) => {
        const res = await axiosInstance.delete(`/api/subjects/${id}`);
        return res.data;
      },
      onSuccess: (data) => {
        console.log(data)
        toast.success(data?.message)
        refetch()
        // queryClient.invalidateQueries(['subjects', searchTerm, branch, semester, page]); 



      },
      onError: (error) => {
        console.error("Error deleting subject:", error);
      },
  })

  const handleEdit = async (id:string)=>{
    console.log(id)
    redirect(`/admin/courses/${id}/edit`)


  }

  const handleDelete = async (id:string)=>{
    console.log(id)
    mutate.mutate(id)
  }
  console.log(data)
  return (
    <div className="max-w-4xl mx-auto p-6">
        <div className='flex flex-row items-center justify-between m-2'>
      <p className="text-2xl items-center font-bold mb-4">Search Subjects {data?.data?.totalCount}</p>
      <Link href='/admin/courses/add'>
      <Button className='flex items-center ' variant={'outline'}><Plus /> Add</Button>
      </Link>
        </div>
      <div className="flex gap-4 mb-4">
        <Input
          placeholder="Search by Subject Name or Code..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <Select onValueChange={setBranch}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {branches.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSemester}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Semester" />
          </SelectTrigger>
          <SelectContent>
            {semesters.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
       
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject Name</TableHead>
              <TableHead>Subject Code</TableHead>
              <TableHead>Staff Name</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>Semester</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
          {data?.data?.subjects.length==0 && (
            <TableCell>No Results Found</TableCell>

            )}

            {data?.data?.subjects?.map((subject: any) => (
                <TableRow key={subject.id}>
                <TableCell>{subject.subjectName}</TableCell>
                <TableCell>{subject.subjectCode}</TableCell>
                <TableCell>{subject.staffName}</TableCell>
                <TableCell>{subject.branchName}</TableCell>
                <TableCell>{subject.semesterNumber}</TableCell>
                <TableCell onClick={()=>handleEdit(subject.id)}><Edit className='text-blue-500 cursor-pointer'/></TableCell>
                <TableCell onClick={()=>handleDelete(subject.id)}><Trash2 className='text-red-500 cursor-pointer'/></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </>
      )}
      <div className="flex justify-between mt-4">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>Page {page}...of...{data?.data.totalPages} Pages</span>
        <Button onClick={() => setPage((p) => p + 1)} disabled={data?.data?.subjects.length < 10}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;