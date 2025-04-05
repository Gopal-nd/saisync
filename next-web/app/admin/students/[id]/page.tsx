'use client'
import BasicUserDetails from "@/components/admin/user/BasicUserDetails";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

const StudentDetails = () => {
    const params = useParams();
    const id = params.id

    const {data:userDataById,isLoading:userDataLoadingById,error} = useQuery({
        queryKey:["student",id],
        queryFn: async () => {
            if(!id) throw new Error("No ID provided");
            const res = await axiosInstance.get('/api/students', {params: {id}})
            return res.data.data
        },
    })

    if(userDataLoadingById){
        return <div>Loading...</div>
    }
  return (
    <div>
      <h1>Student Details - {id}</h1>
      <BasicUserDetails id={id as string}/>

    </div>
  )
}

export default StudentDetails