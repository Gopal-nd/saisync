import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import axiosInstance from '@/lib/axiosInstance';
import useAuthStore from '@/store/useAuthStore';

const useAuthValidate = () => {
  const router = useRouter();

  const {setUser, user} = useAuthStore()

  useEffect(() => {
    const validateToken = async () => {
      try {
        const data = await axiosInstance.get('/api/auth/validate');
        if (data.data.isValid) {
          console.log(data.data.data.role)
          setUser({
            email:data.data.sendUser.email,
            id:data.data.sendUser.id,
            role:data.data.sendUser.role,
            branch:data.data.sendUser.branch,
            name:data.data.sendUser.name,
            semester:data.data.sendUser.semester,
            section:data.data.sendUser.section,
            usn:data.data.sendUser.usn,
            schema:data.data.sendUser.schema
          })
          
        } else {
          router.push('/sign-in');
        }
      } catch (error) {
        console.log('error in the useAuthValidateHook',error)
        router.push('/sign-in');
      } 
    };

    validateToken();
  }, [router]);

  return { user};
};

export default useAuthValidate;
