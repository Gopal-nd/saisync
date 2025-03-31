import React from 'react'
import { Button } from './ui/button'
import axios from 'axios'
import useAuthStore from '@/store/useAuthStore'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/lib/axiosInstance'
const Logout = () => {
    const router = useRouter()
    const {clearToken, clearUser,  logout} = useAuthStore()
    const handlelogout = async()=>{
        const res = await axiosInstance.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,{})
        console.log(res.data)
        router.push('/sign-in')
    }

  return (
   <Button onClick={handlelogout}>Logout</Button>
  )
}

export default Logout