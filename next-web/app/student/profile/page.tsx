'use client'

import AcademicsDetails from "@/components/student/profile/AcademicsDetails";
import BasicUserDetails from "@/components/student/profile/BasicUserDetails";
import FamilyDetails from "@/components/student/profile/FamilyDetails";
import UserHostelDetails from "@/components/student/profile/HostelDetails";
import UserBusDetails from "@/components/student/profile/UserBusDetails";
import UserDocuments from "@/components/student/profile/userDocumnets";
import UserPersonalDetails from "@/components/student/profile/UserPersonalDetails";
import axiosInstance from "@/lib/axiosInstance";
import useAuthStore from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";


const StudentDetails = () => {
  const {user} = useAuthStore();
    const {data:userDataById,isLoading:userDataLoadingById,error} = useQuery({
        queryKey:["student",user?.id],
        queryFn: async () => {
            if(user?.id) throw new Error("No ID provided");
            const res = await axiosInstance.get('/api/students', {params: {id:user?.id}})
            return res.data.data
        },
    })

    if(userDataLoadingById){
        return <div>Loading</div>
    }
    const id = user?.id
  return (
    <div>

      <BasicUserDetails id={id as string}/>
      <UserPersonalDetails id = {id as string}/>
      <FamilyDetails id={id as string}/>
      <AcademicsDetails id={id as string}/>
      <UserBusDetails id={id as string}/>
      <UserHostelDetails id={id as string}/>
      <UserDocuments id={id as string}/>
    </div>
  )
}

export default StudentDetails