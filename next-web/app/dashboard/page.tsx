'use client';
import useAuthValidate from '@/hooks/useAuthValidate';
import useAuthStore from '@/store/useAuthStore';


export default function Dashboard() {
const {role} = useAuthStore()

  

  return <h1>Welcome to Dashboard, {role === 'ADMIN' ? 'Admin' : 'User'}!</h1>;


}
