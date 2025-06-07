'use client'
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { debounce } from 'lodash';
import axiosInstance from '@/lib/axiosInstance';
import {Edit, Trash2,Plus} from 'lucide-react'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';



const fetchSubjects = async (query: string,  page: number) => {
  const response = await axiosInstance.get('/api/support-staff/search', {
    params: { query,  page, limit: 10 },
  });
  return response.data;
};

const AllSupportStaff = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  
  const debouncedSearch = debounce((value) => {
    setSearchTerm(value);
  }, 400);

  const { data, isLoading,refetch } = useQuery({
    queryKey: ['hod', searchTerm,  page],
    queryFn: () => fetchSubjects(searchTerm, page),

  });
  const mutate = useMutation({
    mutationFn: async (id: string) => {
        const res = await axiosInstance.delete(`/api/support-staff/${id}`);
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
      redirect(`/admin/support-staff/${id}`)

  }

  const handleDelete = async (id:string)=>{
    console.log(id)
    mutate.mutate(id)
  }
  console.log(data)
  return (
    <div className="container mx-auto p-6">
          

        <div className='flex flex-row items-center justify-between m-2'>
        <p className="text-2xl items-center font-bold mb-4">Search Support Staff {data?.data?.totalCount}</p>
      {/* <Link href='/admin/courses/add'>
      <Button className='flex items-center ' variant={'outline'}><Plus /> Add</Button>
      </Link> */}
        </div>
      <div className="flex gap-4 mb-4">
        <Input
            placeholder="Search by Name or Email..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        {/* <Select onValueChange={setBranch}>
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
        <Select onValueChange={setSection}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Section" />
          </SelectTrigger>
          <SelectContent>
            {sections.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
       
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead>CollegeId</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
           
          {data?.data?.supportStaff?.length==0 && (
            <TableCell>No Results Found</TableCell>

            )}

            {data?.data?.supportStaff?.map((student: any) => (
                <TableRow key={student.id} className='cursor-pointer' onClick={()=>handleEdit(student.id)}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.branch ?? "-"}</TableCell>
                <TableCell>{student.collageId ?? "-"}</TableCell>
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
        <Button onClick={() => setPage((p) => p + 1)} disabled={data?.data?.supportStaff.length < 10}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllSupportStaff;