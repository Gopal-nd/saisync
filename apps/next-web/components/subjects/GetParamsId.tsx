// 'use client'
// import axiosInstance from '@/lib/axiosInstance'
// import { useQuery } from '@tanstack/react-query'
// import React from 'react'
// import EditCoursePage from './SubjectsPage'

// const GetParamsId = ({id}:{id:string}) => {
//     const {data,isLoading} = useQuery({
//         queryKey:['subject',id],
//         queryFn:async()=>{
//             const res = await axiosInstance.get('/api/subjects',{params:{id}})
//             console.log(res.data.data)
//         }
//     })
    
    
//     if(isLoading){
//         return <div>Loging...</div>
//     }

//   return (
//     <EditCoursePage/>
//   )
// }

// export default GetParamsId