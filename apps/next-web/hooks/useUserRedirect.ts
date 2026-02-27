'use client';
import useAuthValidate from '@/hooks/useAuthValidate';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next//navigation';


export default function useUserRedirect() {
const {role} = useAuthStore()
const router = useRouter();

useAuthValidate();
if (!role) {
  router.push('/sign-in'); 
}

if (role === 'ADMIN') {
  router.push('/admin');  
}
else if (role === 'STUDENT') {
  router.push('/student');
}
else if (role === 'STAFF') {
  router.push('/staff');
}
else if (role === 'HOD') {
  router.push('/hod');
}
else if (role === 'SUPPORT_STAFF') {
  router.push('/support-staff');
}else{
  router.push('/sign-in');
}
}