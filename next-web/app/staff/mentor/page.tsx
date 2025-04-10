'use client'
import axiosInstance from '@/lib/axiosInstance'
import useAuthStore from '@/store/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation'
const MentorPage = () => {
    const {user} = useAuthStore()
    const {data,isLoading} = useQuery({
        queryKey:['mentor',user?.id],
        queryFn: async () => {
            const res = await axiosInstance.get('/api/mentor/mystudents', { params: { id: user?.id } })
            return res.data
        },
    })
    console.log(data)

  const handleOnclick = async (id:string)=>{
    console.log(id)
    redirect(`/staff/mentor/${id}`)

  }
  return (
    <div>
          {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
       
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> SI.NO</TableHead>
              <TableHead> Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Schema</TableHead>
              <TableHead>USN</TableHead>
              <TableHead>CollegeId</TableHead>

              {/* <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead> */}

            </TableRow>
          </TableHeader>
          <TableBody>
          {data?.data?.length==0 && (
            <TableCell>No Students Assigned </TableCell>

            )}

            {data?.data?.map((student: any,index:number) => (
                <TableRow key={student.id} className='cursor-pointer' onClick={()=>handleOnclick(student.id)}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.schema ?? "-"}</TableCell>
                <TableCell>{student.usn ?? "-"}</TableCell>
                <TableCell>{student.collageId ?? "-"}</TableCell>
                {/* <TableCell onClick={()=>handleEdit(student.id)}><Edit className='text-blue-500 cursor-pointer'/></TableCell>
                <TableCell onClick={()=>handleDelete(student.id)}><Trash2 className='text-red-500 cursor-pointer'/></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </>
      )}
    </div>
  )
}

export default MentorPage