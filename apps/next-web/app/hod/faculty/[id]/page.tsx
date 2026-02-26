'use client'
import AcademicsDetails from "@/components/admin/user/AcademicsDetails";
import BasicUserDetails from "@/components/admin/user/BasicUserDetails";
import FamilyDetails from "@/components/admin/user/FamilyDetails";
import UserHostelDetails from "@/components/admin/user/HostelDetails";
import UserBusDetails from "@/components/admin/user/UserBusDetails";
import UserDocuments from "@/components/admin/user/userDocumnets";
import UserPersonalDetails from "@/components/admin/user/UserPersonalDetails";
import UserWorkDetails from "@/components/admin/user/WorkDetails";
import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"
import { Suspense } from "react";

const StudentDetails = () => {
    const params = useParams();
    const id = params.id

    const {data:userDataById,isLoading:userDataLoadingById,error} = useQuery({
        queryKey:["student",id],
        queryFn: async () => {
            if(!id) throw new Error("No ID provided");
            const res = await axiosInstance.get('/api/staff', {params: {id}})
            return res.data.data
        },
    })

    if(userDataLoadingById){
        return <div>Loading..id</div>
    }
  return (
    <div>
      
      <Suspense fallback={<div>Loading...</div>}>
      <BasicUserDetails id={id as string}/>
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
      <UserPersonalDetails id = {id as string}/>
      </Suspense>
      <FamilyDetails id={id as string}/>
      <AcademicsDetails id={id as string}/>
      <UserBusDetails id={id as string}/>
      <UserHostelDetails id={id as string}/>
      <UserWorkDetails id={id as string}/>
      <UserDocuments id={id as string}/>


    </div>
  )
}

export default StudentDetails